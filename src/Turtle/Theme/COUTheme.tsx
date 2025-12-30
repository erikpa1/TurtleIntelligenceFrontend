import React from "react"
import {COUEntityView} from "@Turtle/Interfaces/ICOUView"
import {TurtleTheme} from "@Turtle/Theme/theme"
import {HorizontalForm, VerticalForm} from "@Turtle/Antd/Formular"
import {COUSubmitButton} from "@Turtle/Utils/Cou"
import ThemeApi from "@Turtle/Theme/ThemeApi"
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView"
import ColorAttributeView from "@Turtle/Components/Forms/ColorAttributeView"
import {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView"


export default function COUTheme(props: COUEntityView<TurtleTheme>) {

    const entity = props.entity

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

            <BoolAttributeView
                entity={entity}
                attribute={"default"}
            />

            <ColorAttributeView
                entity={entity}
                attribute={"iconPrimaryColor"}
            />

            <ColorAttributeView
                entity={entity}
                attribute={"iconSecondaryColor"}
            />

            <COUSubmitButton api={ThemeApi} props={props}/>
        </VerticalForm>
    )
}