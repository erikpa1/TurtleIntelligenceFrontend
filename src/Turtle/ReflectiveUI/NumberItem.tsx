import {Form, Input} from "antd";


interface StringItemProps {
    entity: any
    attribute: string
    disabled?: boolean
}

export default function IntItem({
                                    entity,
                                    attribute,
                                    disabled
                                }: StringItemProps) {


    return (
        <Form.Item
            label={attribute}
        >
            <Input
                type={"number"}
                disabled={disabled}
                defaultValue={entity[attribute]}
                onChange={(e) => {
                    entity[attribute] = parseInt(e.target.value)
                }}
            />

        </Form.Item>
    )

}