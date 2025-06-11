import {PropertyParent, StringProperty} from "@Turtle/Data/Properties";
import {ColorPicker, Form, Input, Space} from "antd";
import {useTranslation} from "react-i18next";
import React from "react";


interface StringPropertyViewProps {
    entity: any
    property: StringProperty
}


export default function ColorPropertyView({entity, property}: StringPropertyViewProps) {

    const [t] = useTranslation()

    const [val, setVal] = React.useState<string>(entity[property.key])

    React.useEffect(() => {
        setVal(entity[property.key])
    }, [entity])

    return (
        <Form.Item label={`${t(property.label)}:`}>
            <Space>
                <Input
                    value={val}
                    onChange={(e) => {
                        const color = e.target.value
                        entity[property.key] = color
                        setVal(color)
                    }}
                />
                <ColorPicker
                    value={val}
                    onChange={(e) => {
                        const color = `#${e.toHex()}`
                        entity[property.key] = color
                        setVal(color)
                    }}
                />
            </Space>
        </Form.Item>
    )
}