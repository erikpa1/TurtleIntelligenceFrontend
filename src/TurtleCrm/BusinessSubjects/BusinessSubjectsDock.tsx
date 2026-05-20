import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import {Splitter} from "antd";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import TurtleColors from "@Turtle/Constants/TurtleColors";
import BusinessSubjectsHierarchy from "@TurtleCrm/BusinessSubjects/BusinessSubjectsHierarchy";


export default function BusinessSubjectsDock({}) {

    const {bigPadding} = useTurtleTheme()

    return (
        <SplitterWithHeader topbar={<div/>}>
            <Splitter.Panel
                defaultSize={"30%"}
                style={{
                    padding: bigPadding,
                    backgroundColor: TurtleColors.BG_1
                }}
            >
                <BusinessSubjectsHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel>

            </Splitter.Panel>
        </SplitterWithHeader>
    )
}