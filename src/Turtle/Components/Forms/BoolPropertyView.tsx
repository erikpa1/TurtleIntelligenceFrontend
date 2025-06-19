import {BoolProperty, PropertyParent, StringProperty} from "@Turtle/Data/Properties";
import {Form, Input, Switch} from "antd";
import {useTranslation} from "react-i18next";


interface BoolPropertyViewProps {
    entity: any
    property: BoolProperty

}


export default function BoolPropertyView({entity, property}: BoolPropertyViewProps) {

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

interface BoolAttributeViewProps {
    entity: any
    attribute: string
    onChange?: (newVal: boolean) => void
}


export function BoolAttributeView({
                                      entity,
                                      attribute,
                                      onChange
                                  }: BoolAttributeViewProps) {

    const [t] = useTranslation()

    return (
        <Form.Item label={`${t(attribute)}:`}>
            <Switch
                defaultChecked={entity[attribute]}
                onChange={(e) => {
                    entity[attribute] = e
                    onChange && onChange(e)
                }}
            />
        </Form.Item>
    )
}