import {PropertyParent, StringProperty} from "@Turtle/Data/Properties";
import {ColorPicker, ColorPickerProps, Form, FormItemProps, Input, InputProps, Space} from "antd";
import {useTranslation} from "react-i18next";
import React from "react";


interface ColorAttributeViewProps {
    entity: any
    attribute: string
    label?: string
    onChange?: any
    inputProps?: InputProps
    itemProps?: FormItemProps
    colorPickerProps?: ColorPickerProps
}


export default function ColorAttributeView({
                                               entity,
                                               attribute,
                                               label,
                                               onChange,
                                               inputProps,
                                               itemProps,
                                               colorPickerProps
                                           }: ColorAttributeViewProps) {


    const [t] = useTranslation()

    const [val, setVal] = React.useState<string>(entity[attribute])

    function colorChanged(newColor: string) {
        entity[attribute] = newColor
        setVal(newColor)
    }


    React.useEffect(() => {
        setVal(entity[attribute])
    }, [entity])


    return (
        <Form.Item
            label={`${t(label ?? attribute)}:`}
            {...itemProps}
        >
            <Space>
                <Input
                    defaultValue={entity[attribute]}
                    onChange={(e) => {
                        const color = e.target.value
                        colorChanged(color)
                    }}
                    {...inputProps}
                />
                <ColorPicker
                    value={val}
                    onChange={(e) => {
                        const color = `#${e.toHex()}`
                        colorChanged(color)
                    }}
                    {...colorPickerProps}
                />
            </Space>
        </Form.Item>
    )
}