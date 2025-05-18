import {Form, Input} from "antd";


interface StringItemProps {
    entity: any
    attribute: string
    disabled?: boolean
}

export default function StringItem({
                                       entity,
                                       attribute,
                                       disabled
                                   }: StringItemProps) {


    return (
        <Form.Item
            label={attribute}
        >
            <Input
                disabled={disabled}
                defaultValue={entity[attribute]}
                onChange={(e) => {
                }}
            />

        </Form.Item>
    )

}