import {Splitter} from "antd"
import {SplitterWithHeader} from "@Turtle/Antd/Splitter"

import TurtleColors from "@Turtle/Constants/TurtleColors"
import CitiesHierarchy from "@TurtleCrm/Cities/CitiesHierarchy"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";

export default function CitiesDock() {

    const {bigPadding} = useTurtleTheme()

    return (
        <SplitterWithHeader topbar={<div/>}>
            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: TurtleColors.BG_1,
                    padding: bigPadding
                }}
            >
                <CitiesHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel>

            </Splitter.Panel>
        </SplitterWithHeader>
    )
}