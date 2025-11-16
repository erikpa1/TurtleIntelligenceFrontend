import React from "react"
import {Flex, Form} from "antd";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {NeuralNetwork} from "@TurtleApp/Data/NN";
import TurtleApp from "@TurtleApp/TurtleApp";

interface CreateNNViewProps {
    nn: NeuralNetwork
    onBeforeSubmit: any
    onAfterSubmit: any
}

export default function CreateNNView({
                                         nn,
                                         onBeforeSubmit,
                                         onAfterSubmit
                                     }: CreateNNViewProps) {

    async function createClicked() {
        onBeforeSubmit()
        TurtleApp.Lock()
        // await NNApi
        TurtleApp.Unlock()
        onAfterSubmit()
    }

    return (
        <Form>
            <Flex vertical>

                <StringAttributeView
                    entity={nn}
                    attribute={"name"}
                />

                <StringAttributeView
                    entity={nn}
                    attribute={"description"}
                />

                <RightSubmitButton onClick={createClicked}/>

            </Flex>

        </Form>
    )
}