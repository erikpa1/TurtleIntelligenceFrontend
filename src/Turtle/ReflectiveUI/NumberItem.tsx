import {Form, Input} from "antd";
import {useTranslation} from "react-i18next";


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

    const [t] = useTranslation()

    return (
        <Form.Item
            label={t(attribute)}
            style={{
                margin: 0
            }}
        >
            <Input
                size={"small"}
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