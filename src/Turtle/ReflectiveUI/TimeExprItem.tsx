import {useTranslation} from "react-i18next";
import {Button, Form, Input, Space} from "antd";
import {FieldTimeOutlined, HourglassOutlined} from "@ant-design/icons";
import React from "react";


interface StringItemProps {
    entity: any
    attribute: string
    disabled?: boolean
}

export default function TimeExrItem({
                                        entity,
                                        attribute,
                                        disabled
                                    }: StringItemProps) {

    const [t] = useTranslation()

    const timePickerRef = React.useRef<any>()


    return (

        <Form.Item
            label={t(attribute)}
            style={{
                margin: 0
            }}
        >
            <Space>
                <Input
                    size={"small"}
                    disabled={disabled}
                    defaultValue={entity[attribute]}
                    onChange={(e) => {
                        entity[attribute] = e.target.value
                    }}
                />
                
                <HourglassOutlined/>
            </Space>

        </Form.Item>
    )

}