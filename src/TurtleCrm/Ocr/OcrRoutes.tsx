import React from "react"
import {Route} from "react-router-dom"

const OcrToolsDock = React.lazy(() => import("@TurtleCrm/Ocr/OcrTools/OcrToolsDock"))
const OcrPipelinesDock = React.lazy(() => import("@TurtleCrm/Ocr/OcrPipelines/OcrPipelinesDock"))


export default function GetOcrRoutes(): Array<any> {

    return ([
        <Route
            path={"/ocr-tools"}
            element={<OcrToolsDock/>}
        />,
        <Route
            path={"/ocr-pipelines"}
            element={<OcrPipelinesDock/>}
        />
    ])
}