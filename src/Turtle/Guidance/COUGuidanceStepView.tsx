import React from "react"
import {GuidanceStep} from "@Turtle/Knowledge/Data/Guidance";
import {Flex} from "antd";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";
import {Knowledge} from "@Turtle/Knowledge/Data/Knowledge";
import KnowledgeApi from "@Turtle/Knowledge/Api/KnowledgeApi";


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