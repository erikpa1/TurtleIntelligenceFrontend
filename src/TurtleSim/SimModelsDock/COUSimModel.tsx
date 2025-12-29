import React from "react"
import SimModel from "@TurtleApp/Data/SimModel";
import {Flex, Form} from "antd";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";
import SimModelsApi from "@TurtleApp/Api/SimModelsApi";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";

interface COUSimModelProps {
    model: SimModel
    onBeforeSubmit: any
    onAfterSubmit: any

}

export default function COUSimModel({

                                        model,
                                        onBeforeSubmit,
                                        onAfterSubmit,

                                    }) {

    async function submitPressed() {
        onBeforeSubmit()
        TurtleApp.Lock()
        await SimModelsApi.COU(model)
        TurtleApp.Unlock()
        onAfterSubmit()
    }


    return (
        <Form>
            <Flex vertical gap={15}>

                <StringAttributeView entity={model} attribute={"name"}/>

                <RightSubmitButton onClick={submitPressed}/>

            </Flex>
        </Form>
    )
}