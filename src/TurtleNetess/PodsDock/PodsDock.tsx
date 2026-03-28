import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import PodsTopBar from "@TurtleNetess/PodsDock/PodsTopBar";
import {Splitter} from "antd";
import ColorConstants from "@Turtle/Constants/ColorConstants";



export default function PodsDock() {
    return (
        <SplitterWithHeader topbar={<PodsTopBar/>}>
            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: ColorConstants.WHITE
                }}
            >

            </Splitter.Panel>

            <Splitter.Panel>

            </Splitter.Panel>
        </SplitterWithHeader>
    )
}