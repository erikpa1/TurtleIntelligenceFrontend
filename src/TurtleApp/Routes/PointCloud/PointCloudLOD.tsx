import React from "react";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import PointCloudApi from "@TurtleApp/Routes/PointCloud/PointCloudApi";
import PointCloudEntry from "@TurtleApp/Routes/PointCloud/PointCloudEntry";
import PointCloudNodeEntry from "@TurtleApp/Routes/PointCloud/PointCloudNodeEntry";

interface PointCloudLODProps {
    cloud: PointCloudEntry
    tree: Array<PointCloudNodeEntry>
}

const SPLIT_THRESHOLD = 0.15
const MAX_VISIBLE_NODES = 64
const MAX_LOADED_NODES = 96
const MAX_CONCURRENT_FETCHES = 6
const UNUSED_DISPOSE_MS = 5000
const CHECK_INTERVAL_MS = 150
const CAMERA_EPSILON = 1e-4
const FLAT_COLOR = "#4f9eff"

interface LoadedNode {
    points: THREE.Points
    geometry: THREE.BufferGeometry
    material: THREE.PointsMaterial
    lastUsed: number
}

function nodeCenter(node: PointCloudNodeEntry): THREE.Vector3 {
    return new THREE.Vector3(
        (node.boundsMin[0] + node.boundsMax[0]) / 2,
        (node.boundsMin[1] + node.boundsMax[1]) / 2,
        (node.boundsMin[2] + node.boundsMax[2]) / 2,
    )
}

function nodeRadius(node: PointCloudNodeEntry): number {
    const dx = node.boundsMax[0] - node.boundsMin[0]
    const dy = node.boundsMax[1] - node.boundsMin[1]
    const dz = node.boundsMax[2] - node.boundsMin[2]
    return Math.sqrt(dx * dx + dy * dy + dz * dz) / 2 || 0.001
}

export default function PointCloudLOD({cloud, tree}: PointCloudLODProps) {

    const groupRef = React.useRef<THREE.Group>(null)

    const nodesByPath = React.useMemo(() => {
        const map = new Map<string, PointCloudNodeEntry>()
        tree.forEach((node) => map.set(node.path, node))
        return map
    }, [tree])

    const pointSize = React.useMemo(() => {
        const dx = cloud.boundsMax[0] - cloud.boundsMin[0]
        const dy = cloud.boundsMax[1] - cloud.boundsMin[1]
        const dz = cloud.boundsMax[2] - cloud.boundsMin[2]
        const diagonal = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1
        return diagonal / 500
    }, [cloud])

    const loadedRef = React.useRef<Map<string, LoadedNode>>(new Map())
    const pendingRef = React.useRef<Map<string, AbortController>>(new Map())
    const queueRef = React.useRef<Array<string>>([])
    const activeCountRef = React.useRef(0)

    const lastCheckRef = React.useRef(0)
    const lastCamPosRef = React.useRef(new THREE.Vector3(NaN, NaN, NaN))
    const lastCamQuatRef = React.useRef(new THREE.Quaternion(NaN, NaN, NaN, NaN))

    function disposeNode(path: string) {
        const entry = loadedRef.current.get(path)
        if (!entry) {
            return
        }
        groupRef.current?.remove(entry.points)
        entry.geometry.dispose()
        entry.material.dispose()
        loadedRef.current.delete(path)
    }

    function processQueue() {
        while (activeCountRef.current < MAX_CONCURRENT_FETCHES && queueRef.current.length > 0) {
            const path = queueRef.current.shift()
            if (path === undefined) {
                break
            }
            if (loadedRef.current.has(path) || pendingRef.current.has(path)) {
                continue
            }
            fetchNode(path)
        }
    }

    function fetchNode(path: string) {
        const node = nodesByPath.get(path)
        if (!node) {
            return
        }

        const controller = new AbortController()
        pendingRef.current.set(path, controller)
        activeCountRef.current += 1

        PointCloudApi.FetchNodeData(cloud.uid, path, controller.signal)
            .then((buffer) => {
                pendingRef.current.delete(path)
                activeCountRef.current -= 1

                if (controller.signal.aborted) {
                    return
                }

                const pointCount = node.pointCount
                const geometry = new THREE.BufferGeometry()

                const positions = new Float32Array(buffer, 0, pointCount * 3)
                geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

                if (cloud.hasColor) {
                    const colors = new Uint8Array(buffer, pointCount * 3 * 4, pointCount * 3)
                    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3, true))
                }

                const material = new THREE.PointsMaterial({
                    size: pointSize,
                    sizeAttenuation: true,
                    vertexColors: cloud.hasColor,
                    color: cloud.hasColor ? undefined : FLAT_COLOR,
                })

                const points = new THREE.Points(geometry, material)
                groupRef.current?.add(points)
                loadedRef.current.set(path, {points, geometry, material, lastUsed: Date.now()})

                processQueue()
            })
            .catch((err) => {
                pendingRef.current.delete(path)
                activeCountRef.current -= 1
                if (!controller.signal.aborted) {
                    console.error(`PointCloudLOD: failed to fetch node ${path}`, err)
                }
                processQueue()
            })
    }

    function walk(path: string, frustum: THREE.Frustum, camPos: THREE.Vector3, desired: Array<{ path: string, projectedSize: number }>) {
        const node = nodesByPath.get(path)
        if (!node) {
            return
        }

        const center = nodeCenter(node)
        const radius = nodeRadius(node)
        const sphere = new THREE.Sphere(center, radius)

        if (!frustum.intersectsSphere(sphere)) {
            return
        }

        const distance = Math.max(camPos.distanceTo(center), 0.001)
        const projectedSize = radius / distance

        const childPaths: Array<string> = []
        for (let i = 0; i < 8; i++) {
            const childPath = path + i
            if (nodesByPath.has(childPath)) {
                childPaths.push(childPath)
            }
        }

        if (projectedSize > SPLIT_THRESHOLD && childPaths.length > 0) {
            childPaths.forEach((childPath) => walk(childPath, frustum, camPos, desired))
        } else {
            desired.push({path, projectedSize})
        }
    }

    useFrame(({camera}) => {

        const now = Date.now()
        if (now - lastCheckRef.current < CHECK_INTERVAL_MS) {
            return
        }

        const isFirstCheck = lastCheckRef.current === 0
        const posDelta = camera.position.distanceToSquared(lastCamPosRef.current)
        const quatDelta = Math.abs(1 - camera.quaternion.dot(lastCamQuatRef.current))

        if (!isFirstCheck && posDelta < CAMERA_EPSILON && quatDelta < CAMERA_EPSILON) {
            return
        }

        lastCheckRef.current = now
        lastCamPosRef.current.copy(camera.position)
        lastCamQuatRef.current.copy(camera.quaternion)

        camera.updateMatrixWorld()
        const inverse = new THREE.Matrix4().copy(camera.matrixWorld).invert()
        const projScreenMatrix = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, inverse)
        const frustum = new THREE.Frustum()
        frustum.setFromProjectionMatrix(projScreenMatrix)

        const desired: Array<{ path: string, projectedSize: number }> = []
        walk("", frustum, camera.position, desired)

        desired.sort((a, b) => b.projectedSize - a.projectedSize)
        const dropped = desired.length - MAX_VISIBLE_NODES
        if (dropped > 0) {
            console.debug(`PointCloudLOD: dropping ${dropped} nodes over the ${MAX_VISIBLE_NODES}-node visibility budget`)
        }
        const desiredPaths = new Set(desired.slice(0, MAX_VISIBLE_NODES).map((d) => d.path))

        desiredPaths.forEach((path) => {
            const loaded = loadedRef.current.get(path)
            if (loaded) {
                loaded.lastUsed = now
            } else if (!pendingRef.current.has(path) && !queueRef.current.includes(path)) {
                queueRef.current.push(path)
            }
        })

        queueRef.current = queueRef.current.filter((path) => desiredPaths.has(path))

        pendingRef.current.forEach((controller, path) => {
            if (!desiredPaths.has(path)) {
                controller.abort()
            }
        })

        loadedRef.current.forEach((entry, path) => {
            if (!desiredPaths.has(path) && now - entry.lastUsed > UNUSED_DISPOSE_MS) {
                disposeNode(path)
            }
        })

        if (loadedRef.current.size > MAX_LOADED_NODES) {
            let overBudget = loadedRef.current.size - MAX_LOADED_NODES
            const evictable = Array.from(loadedRef.current.entries())
                .filter(([path]) => !desiredPaths.has(path))
                .sort((a, b) => a[1].lastUsed - b[1].lastUsed)

            for (const [path] of evictable) {
                if (overBudget <= 0) {
                    break
                }
                disposeNode(path)
                overBudget -= 1
            }
        }

        processQueue()
    })

    React.useEffect(() => {
        return () => {
            pendingRef.current.forEach((controller) => controller.abort())
            pendingRef.current.clear()
            queueRef.current = []
            activeCountRef.current = 0
            Array.from(loadedRef.current.keys()).forEach(disposeNode)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cloud.uid])

    return <group ref={groupRef}/>
}
