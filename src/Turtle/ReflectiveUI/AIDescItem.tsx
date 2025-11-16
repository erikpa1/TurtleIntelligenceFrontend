import React from "react"
import {Form, Input} from "antd";
import {useTranslation} from "react-i18next";
import TextArea from "antd/es/input/TextArea";


interface AIDescriptionItemProps {
    entity: any
    attribute: string
    disabled?: boolean

}

export default function AIDescriptionItem({
                                              entity,
                                              attribute,
                                              disabled,
                                              ...restProps // Capture all other props
                                          }: AIDescriptionItemProps & React.ComponentProps<typeof Input>) {

    const [t] = useTranslation()

    return (
        <Form.Item
            label={`${t(attribute)}:`}
            style={{
                margin: 0
            }}
        >
            <TextArea
                size={"small"}
                disabled={disabled}
                defaultValue={entity[attribute]}
                onChange={((e) => {
                    entity[attribute] = e.target.value
                }) as any}
                {...restProps as any} // Forward all additional props to Input
            />
        </Form.Item>
    )
}