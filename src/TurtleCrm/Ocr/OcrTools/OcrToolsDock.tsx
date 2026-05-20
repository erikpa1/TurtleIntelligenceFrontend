import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import {Splitter} from "antd";
import TurtleColors from "@Turtle/Constants/TurtleColors";

export default function OcrToolsDock({}) {
    return (
        <SplitterWithHeader topbar={<div/>}>

            <Splitter.Panel
                defaultSize={"30%"}
                style={{
                    backgroundColor: TurtleColors.BG_1
                }}
            >

            </Splitter.Panel>

            <Splitter.Panel
                defaultSize={"70%"}
            >

            </Splitter.Panel>

        </SplitterWithHeader>
    )
}