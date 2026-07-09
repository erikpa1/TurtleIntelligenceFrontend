import React from "react";
import {Splitter} from "antd"
import {useParams} from "react-router-dom";
import PointCloudTopBar from "@TurtleApp/Routes/PointCloud/PointCloudTopBar";
import PointCloudList from "@TurtleApp/Routes/PointCloud/PointCloudList";
import PointCloudViewer from "@TurtleApp/Routes/PointCloud/PointCloudViewer";
import PointCloudApi from "@TurtleApp/Routes/PointCloud/PointCloudApi";
import PointCloudEntry from "@TurtleApp/Routes/PointCloud/PointCloudEntry";
import {SplitterWithHeader} from '@Turtle/Antd/Splitter';

export default function PointCloudDock() {

    const {cloudUid} = useParams<{ cloudUid?: string }>()

    const [clouds, setClouds] = React.useState<Array<PointCloudEntry>>([])

    const [selectedUid, setSelectedUid] = React.useState(cloudUid ?? "")

    async function refresh() {
        setClouds(await PointCloudApi.ListClouds())
    }

    React.useEffect(() => {
        refresh()
    }, [])

    React.useEffect(() => {
        const hasProcessing = clouds.some((cloud) => cloud.status === "processing")
        if (!hasProcessing) {
            return
        }
        const interval = setInterval(refresh, 2000)
        return () => clearInterval(interval)
    }, [clouds])

    function onUploaded(uploadedCloudUid: string) {
        setSelectedUid(uploadedCloudUid)
        refresh()
    }

    return (
        <SplitterWithHeader
            topbar={
                <PointCloudTopBar onUploaded={onUploaded}/>
            }
        >

            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: "white",
                    padding: "15px",
                }}
            >
                <PointCloudList
                    clouds={clouds}
                    selectedUid={selectedUid}
                    onSelect={setSelectedUid}
                    onChanged={refresh}
                />
            </Splitter.Panel>

            <Splitter.Panel
                style={{
                    backgroundColor: "#fafafa",
                }}
            >
                <PointCloudViewer cloudUid={selectedUid}/>
            </Splitter.Panel>

        </SplitterWithHeader>
    )
}
