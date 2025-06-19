import {PropertyParent, StringProperty} from "@Turtle/Data/Properties";
import {Form, Input} from "antd";
import {useTranslation} from "react-i18next";
import TextArea from "antd/es/input/TextArea";


interface StringPropertyViewProps {
    entity: any
    property: StringProperty
}


export default function StringAreaPropertyView({entity, property}: StringPropertyViewProps) {

    const [t] = useTranslation()


    return (
        <Form.Item label={`${t(property.label)}:`}>
            <TextArea
                defaultValue={entity[property.key]}
                onChange={(e) => {
                    entity[property.key] = e.target.value
                }}
            />
        </Form.Item>
    )
}


export function StringAreaAttributeView({entity, attribute}) {

    const [t] = useTranslation()


    return (
        <Form.Item label={`${t(attribute)}:`}>
            <TextArea
                defaultValue={entity[attribute]}
                onChange={(e) => {
                    entity[attribute] = e.target.value
                }}
            />
        </Form.Item>
    )
}