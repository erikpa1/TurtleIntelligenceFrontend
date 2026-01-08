import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import {Splitter} from "antd";
import ColorConstants from "@Turtle/Constants/ColorConstants";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import OcrPipelinesHierarchy from "@TurtleCrm/Ocr/OcrPipelines/OcrPipelinesHierarchy";

export default function OcrPipelinesDock({}) {

    const {bigPadding} = useTurtleTheme()

    return (
        <SplitterWithHeader topbar={<div/>}>

            <Splitter.Panel
                defaultSize={"30%"}
                style={{
                    backgroundColor: ColorConstants.BG_1,
                    padding: bigPadding
                }}
            >
                <OcrPipelinesHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel
                defaultSize={"70%"}
            >

            </Splitter.Panel>

        </SplitterWithHeader>
    )
}