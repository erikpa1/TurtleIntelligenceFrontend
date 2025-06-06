import {PropertyParent, StringProperty} from "@Turtle/Data/Properties";
import {Form, Input} from "antd";
import {useTranslation} from "react-i18next";


interface StringPropertyViewProps {
    entity: any
    property: StringProperty
}


export default function StringPropertyView({entity, property}: StringPropertyViewProps) {

    const [t] = useTranslation()


    return (
        <Form.Item label={`${t(property.label)}:`}>
            <Input
                defaultValue={entity[property.key]}
                onChange={(e) => {
                    entity[property.key] = e.target.value
                }}
            />
        </Form.Item>
    )
}