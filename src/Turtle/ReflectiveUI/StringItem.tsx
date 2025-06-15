import {Form, Input} from "antd";
import {useTranslation} from "react-i18next";


interface StringItemProps {
    entity: any
    attribute: string
    disabled?: boolean

}

export default function StringItem({
                                       entity,
                                       attribute,
                                       disabled,
                                       ...restProps // Capture all other props
                                   }: StringItemProps & React.ComponentProps<typeof Input>) {

    const [t] = useTranslation()

    return (
        <Form.Item
            label={`${t(attribute)}:`}
            style={{
                margin: 0
            }}
        >
            <Input
                size={"small"}
                disabled={disabled}
                defaultValue={entity[attribute]}
                onChange={(e) => {
                    entity[attribute] = e.target.value
                }}
                {...restProps} // Forward all additional props to Input
            />
        </Form.Item>
    )
}