import React from "react"
import Actor from "@TurtleApp/Data/Actor";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import ColorAttributeView from "@Turtle/Components/Forms/ColorAttributeView";
import TurtleApp from "@TurtleApp/TurtleApp";
import ActorsApi from "@TurtleApp/Api/ActorsApi";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import {COUEntityView} from "@Turtle/Interfaces/ICOUView";
import {VerticalForm} from "@Turtle/Antd/Formular";



export default function COUSimActor(props: COUEntityView<Actor>) {


    const entity = props.entity

    async function submit() {
        props.onBeforeUpdate && props.onBeforeUpdate()
        TurtleApp.Lock()
        await ActorsApi.COUActor(entity)
        TurtleApp.Unlock()
        props.onAfterUpdate && props.onAfterUpdate()
    }

    return (
        <VerticalForm>

            <StringAttributeView
                entity={entity}
                attribute={"name"}
            />

            <ColorAttributeView
                entity={entity}
                attribute={"color"}
            />

            <RightSubmitButton onClick={submit}/>

        </VerticalForm>

    )
}