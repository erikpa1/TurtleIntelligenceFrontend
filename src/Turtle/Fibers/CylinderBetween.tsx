//Source https://claude.ai/chat/74c24893-f6d6-4784-95e0-8f1a6d058c1b
import React, {useMemo} from 'react'
import {Cylinder} from '@react-three/drei'
import * as THREE from 'three'


/**
 * CylinderBetweenPoints - Creates a cylinder between two 3D points with proper rotation
 *
 * @param {Object} props
 * @param {Array} props.start - Start point [x, y, z]
 * @param {Array} props.end - End point [x, y, z]
 * @param {Number} props.radius - Radius of the cylinder (default: 0.1)
 * @param {Number} props.segments - Number of radial segments (default: 16)
 * @param {Object} props.material - Material properties to apply to the cylinder
 * @param {React.ReactNode} props.children - Additional components to render inside the group
 */

interface CylinderBetweenPointsProps {
    start: any
    end: any
    radius?: number
    segments?: number
    material?: any
    children?: any
}

export default function CylinderBetweenPoints({
                                                  start = [0, 0, 0],
                                                  end = [1, 1, 1],
                                                  radius = 0.1,
                                                  segments = 16,
                                                  material,
                                                  children,
                                              }: CylinderBetweenPointsProps) {
    // Convert start and end to THREE.Vector3
    const startVec = useMemo(() => new THREE.Vector3(...start), [start])
    const endVec = useMemo(() => new THREE.Vector3(...end), [end])

    // Calculate midpoint
    const midPoint = useMemo(() => {
        return new THREE.Vector3().addVectors(
            startVec,
            endVec
        ).multiplyScalar(0.5)
    }, [startVec, endVec])

    // Calculate length of the cylinder
    const length = useMemo(() => {
        return startVec.distanceTo(endVec)
    }, [startVec, endVec])

    // Calculate rotation to align cylinder with the two points
    const quaternion = useMemo(() => {
        // Create direction vector
        const direction = new THREE.Vector3().subVectors(endVec, startVec).normalize()

        // Default cylinder orientation in three.js is along the Y axis
        const defaultDirection = new THREE.Vector3(0, 1, 0)

        // Get rotation quaternion
        const quaternion = new THREE.Quaternion()
        quaternion.setFromUnitVectors(defaultDirection, direction)

        return quaternion
    }, [startVec, endVec])

    return (
        <group position={midPoint} quaternion={quaternion}>
            <Cylinder
                args={[radius, radius, length, segments]}
                material={material}
            />
            {children}
        </group>
    )
}