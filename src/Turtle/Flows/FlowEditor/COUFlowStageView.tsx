import React from "react"
import {FlowStage} from "@Turtle/Flows/Flow";
import {Flex, Form} from "antd";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";

interface COUFlowStageViewProps {
    flowStage: FlowStage
    onSubmit: () => void
}

export default function COUFlowStageView({
                                             flowStage,
                                             onSubmit
                                         }: COUFlowStageViewProps) {


    return (
        <Form layout={"vertical"}>
            <Flex vertical gap={15}>
                <StringAttributeView entity={flowStage} attribute={"name"}/>

                <RightSubmitButton onClick={onSubmit}/>
            </Flex>
        </Form>
    )

}