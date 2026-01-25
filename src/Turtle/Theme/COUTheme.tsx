import React from "react"
import {COUEntityView} from "@Turtle/Interfaces/ICOUView"
import {TurtleTheme} from "@Turtle/Theme/theme"
import {HorizontalForm, VerticalForm} from "@Turtle/Antd/Formular"
import {COUSubmitButton} from "@Turtle/Utils/Cou"
import ThemeApi from "@Turtle/Theme/ThemeApi"
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView"
import ColorAttributeView from "@Turtle/Components/Forms/ColorAttributeView"
import {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import {Col, Row} from "antd"


export default function COUTheme(props: COUEntityView<TurtleTheme>) {

    const {setTheme} = useTurtleTheme()

    const entity = props.entity

    function refreshDefault() {
        if (props.entity.default) {
            setTheme(props.entity)
        }
    }

    return (
        <VerticalForm>

            <StringAttributeView
                entity={entity}
                attribute={"name"}
            />

            <StringAttributeView
                entity={entity}
                attribute={"title"}
            />

            <StringAttributeView
                entity={entity}
                attribute={"primaryLogo"}
            />

            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <StringAttributeView
                        entity={entity}
                        attribute={"primaryLogoSizeX"}
                    />
                </Col>
                <Col span={12}>
                    <StringAttributeView
                        entity={entity}
                        attribute={"primaryLogoSizeY"}
                    />
                </Col>
            </Row>

            <StringAttributeView
                entity={entity}
                attribute={"favicon"}
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
                attribute={"primaryColor"}
            />


            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <ColorAttributeView
                        entity={entity}
                        attribute={"iconPrimaryColor"}
                    />
                </Col>
                <Col span={12}>
                    <ColorAttributeView
                        entity={entity}
                        attribute={"iconSecondaryColor"}
                    />
                </Col>
            </Row>

            <COUSubmitButton
                api={ThemeApi}
                props={props}
                afterUpdate={refreshDefault}
            />

        </VerticalForm>
    )
}