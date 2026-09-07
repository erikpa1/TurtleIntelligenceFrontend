import React from "react";
import {useTranslation} from "react-i18next";
import {Flex, Typography} from "antd";
import {Canvas} from "@react-three/fiber";
import {Grid, OrbitControls} from "@react-three/drei";
import PointCloudApi from "@TurtleApp/Routes/PointCloud/PointCloudApi";
import PointCloudEntry from "@TurtleApp/Routes/PointCloud/PointCloudEntry";
import PointCloudNodeEntry from "@TurtleApp/Routes/PointCloud/PointCloudNodeEntry";
import PointCloudLOD from "@TurtleApp/Routes/PointCloud/PointCloudLOD";

interface PointCloudViewerProps {
    cloudUid: string
}

function boundsCenter(cloud: PointCloudEntry): [number, number, number] {
    return [
        (cloud.boundsMin[0] + cloud.boundsMax[0]) / 2,
        (cloud.boundsMin[1] + cloud.boundsMax[1]) / 2,
        (cloud.boundsMin[2] + cloud.boundsMax[2]) / 2,
    ]
}

function boundsDiagonal(cloud: PointCloudEntry): number {
    const dx = cloud.boundsMax[0] - cloud.boundsMin[0]
    const dy = cloud.boundsMax[1] - cloud.boundsMin[1]
    const dz = cloud.boundsMax[2] - cloud.boundsMin[2]
    return Math.sqrt(dx * dx + dy * dy + dz * dz) || 1
}

export default function PointCloudViewer({cloudUid}: PointCloudViewerProps) {

    const [t] = useTranslation()

    const [cloud, setCloud] = React.useState<PointCloudEntry | null>(null)

    const [tree, setTree] = React.useState<Array<PointCloudNodeEntry>>([])

    React.useEffect(() => {

        if (!cloudUid) {
            setCloud(null)
            setTree([])
            return
        }

        let cancelled = false

        let interval: ReturnType<typeof setInterval> | null = null

        async function load() {
            const entry = await PointCloudApi.GetCloud(cloudUid)
            if (cancelled) {
                return
            }
            setCloud(entry)

            if (entry.status === "ready") {
                const nodes = await PointCloudApi.GetTree(cloudUid)
                if (!cancelled) {
                    setTree(nodes)
                }
            } else {
                setTree([])
            }

            if (entry.status !== "processing" && interval) {
                clearInterval(interval)
                interval = null
            }
        }

        load()

        interval = setInterval(load, 2000)
        return () => {
            cancelled = true
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [cloudUid])

    if (!cloudUid || !cloud) {
        return (
            <Flex align={"center"} justify={"center"} style={{height: "100%"}}>
                <Typography.Text type={"secondary"}>
                    {t("select.a.point.cloud")}
                </Typography.Text>
            </Flex>
        )
    }

    if (cloud.status === "processing") {
        return (
            <Flex align={"center"} justify={"center"} style={{height: "100%"}}>
                <Typography.Text type={"secondary"}>
                    {t("processing.point.cloud")}
                </Typography.Text>
            </Flex>
        )
    }

    if (cloud.status === "error") {
        return (
            <Flex align={"center"} justify={"center"} style={{height: "100%"}}>
                <Typography.Text type={"danger"}>
                    {cloud.error || t("error")}
                </Typography.Text>
            </Flex>
        )
    }

    const center = boundsCenter(cloud)
    const diagonal = boundsDiagonal(cloud)
    const cameraDistance = diagonal * 1.5

    return (
        <Canvas
            className={"gl-canvas"}
            camera={{
                far: diagonal * 20,
                position: [
                    center[0] + cameraDistance,
                    center[1] + cameraDistance,
                    center[2] + cameraDistance,
                ]
            }}
            style={{height: "100%"}}
        >
            <OrbitControls makeDefault target={center}/>

            <Grid
                position={[center[0], cloud.boundsMin[1], center[2]]}
                args={[diagonal, diagonal]}
                cellSize={diagonal / 20}
                sectionSize={diagonal / 4}
                fadeDistance={diagonal * 10}
                infiniteGrid
            />

            <React.Suspense fallback={<></>}>
                {tree.length > 0 && (
                    <PointCloudLOD cloud={cloud} tree={tree}/>
                )}
            </React.Suspense>
        </Canvas>
    )
}
