import {PropertyParent, StringProperty} from "@Turtle/Data/Properties";
import {Form, Input} from "antd";


interface StringPropertyViewProps {
    entity: any
    property: StringProperty
}


export default function StringPropertyView({entity, property}: StringPropertyViewProps) {
    return (
        <Form.Item label={property.label}>
            <Input
                defaultValue={entity[property.key]}
                onChange={(e) => {
                    entity[property.key] = e.target.value
                }}
            />
        </Form.Item>
    )
}