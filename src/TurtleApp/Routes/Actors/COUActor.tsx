import React from "react"
import Actor from "@TurtleApp/Data/Actor";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import {Flex, Form} from "antd";
import ColorAttributeView from "@Turtle/Components/Forms/ColorAttributeView";
import TurtleApp from "@TurtleApp/TurtleApp";
import ActorsApi from "@TurtleApp/Api/ActorsApi";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";


interface COUSimActorProps {
    actor: Actor
    onBeforeSubmit?: () => void
    onAfterSubmit?: () => void
}


export default function COUSimActor(props: COUSimActorProps) {


    async function submit() {
        props.onBeforeSubmit && props.onBeforeSubmit()
        TurtleApp.Lock()
        await ActorsApi.COUActor(props.actor)
        TurtleApp.Unlock()
        props.onAfterSubmit && props.onAfterSubmit()
    }

    return (
        <Form layout={"vertical"}>

            <StringAttributeView
                entity={props.actor}
                attribute={"name"}
            />

            <ColorAttributeView
                entity={props.actor}
                attribute={"color"}
            />

            <RightSubmitButton onClick={submit}/>
        </Form>

    )
}