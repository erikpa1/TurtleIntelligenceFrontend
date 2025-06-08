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