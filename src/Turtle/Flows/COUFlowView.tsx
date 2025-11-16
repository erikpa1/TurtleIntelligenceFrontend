import React from "react"
import {Flow, FlowLight} from "@Turtle/Flows/Flow";
import {Flex, Form} from "antd";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import FlowsApi from "@Turtle/Flows/FlowsApi";
import TurtleApp from "@TurtleApp/TurtleApp";


interface COUFlowViewProps {
    flow: Flow
    onBeforeSubmit: any
    onAfterSubmit: any
}

export default function COUFlowView({
                                        flow,
                                        onBeforeSubmit,
                                        onAfterSubmit
                                    }: COUFlowViewProps) {


    async function onSubmit() {

        onBeforeSubmit()
        TurtleApp.Lock()
        await FlowsApi.COU(flow)
        TurtleApp.Unlock()

        onAfterSubmit()


    }

    return (
        <Form layout="vertical">
            <Flex vertical>
                <StringAttributeView entity={flow} attribute={"name"}/>
                <RightSubmitButton onClick={onSubmit}/>
            </Flex>
        </Form>
    )

}