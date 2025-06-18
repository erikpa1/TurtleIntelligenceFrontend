import {PropertyParent, StringProperty} from "@Turtle/Data/Properties";
import {Form, Input, Switch} from "antd";
import {useTranslation} from "react-i18next";


interface StringPropertyViewProps {
    entity: any
    property: StringProperty
}


export default function BoolPropertyView({entity, property}: StringPropertyViewProps) {

    const [t] = useTranslation()

    return (
        <Form.Item label={`${t(property.label)}:`}>
            <Switch
                defaultChecked={entity[property.key]}
                onChange={(e) => {
                    entity[property.key] = e
                }}
            />
        </Form.Item>
    )
}


export function BoolAttributeView({entity, attribute}) {

    const [t] = useTranslation()

    return (
        <Form.Item label={`${t(attribute)}:`}>
            <Switch
                defaultChecked={entity[attribute]}
                onChange={(e) => {
                    entity[attribute] = e
                }}
            />
        </Form.Item>
    )
}