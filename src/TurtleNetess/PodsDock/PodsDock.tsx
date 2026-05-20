import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import PodsTopBar from "@TurtleNetess/PodsDock/PodsTopBar";
import {Splitter} from "antd";
import TurtleColors from "@Turtle/Constants/TurtleColors";
import PodsHierarchy from "@TurtleNetess/PodsDock/PodsHierarchy";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";


export default function PodsDock() {

    const {bigPadding} = useTurtleTheme()

    return (
        <SplitterWithHeader topbar={<PodsTopBar/>}>
            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: TurtleColors.WHITE,
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