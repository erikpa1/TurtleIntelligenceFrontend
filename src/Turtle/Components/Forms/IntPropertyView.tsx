import {IntProperty, PropertyParent} from "@Turtle/Data/Properties";
import {Form, Input} from "antd";
import {useTranslation} from "react-i18next";


interface numberPropertyViewProps {
    entity: any
    property: IntProperty
}


export default function numberPropertyView({entity, property}: numberPropertyViewProps) {

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