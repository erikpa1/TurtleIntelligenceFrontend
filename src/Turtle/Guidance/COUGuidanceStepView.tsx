import React from "react"

import {Flex} from "antd";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";
import KnowledgeApi from "@Turtle/KnowledgeHub/Api/KnowledgeApi";
import {GuidanceStep} from "@Turtle/KnowledgeHub/Artifacts/Guidance";


interface COUGuidanceStepViewProps {
    step: GuidanceStep
    onBeforeSubmit: any
    onAfterSubmit: any
}

export default function COUGuidanceStepView({
                                                step,
                                                onBeforeSubmit,
                                                onAfterSubmit
                                            }: COUGuidanceStepViewProps) {


    async function submit() {
        onBeforeSubmit()
        TurtleApp.Lock()
        await KnowledgeApi.COUStep(step)
        TurtleApp.Unlock()
        onAfterSubmit()
    }


    return (
        <Flex vertical>

            <StringAttributeView
                entity={step}
                attribute={"name"}
            />


            <RightSubmitButton onClick={submit}/>

        </Flex>
    )
}