import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import PodsTopBar from "@TurtleNetess/PodsDock/PodsTopBar";
import {Splitter} from "antd";
import ColorConstants from "@Turtle/Constants/ColorConstants";
import PodsHierarchy from "@TurtleNetess/PodsDock/PodsHierarchy";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";


export default function PodsDock() {

    const {bigPadding} = useTurtleTheme()

    return (
        <SplitterWithHeader topbar={<PodsTopBar/>}>
            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: ColorConstants.WHITE,
                    padding: bigPadding
                }}
            >
                <PodsHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel>

            </Splitter.Panel>
        </SplitterWithHeader>
    )
}