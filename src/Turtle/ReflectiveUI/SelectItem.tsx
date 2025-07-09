import React from "react";
import {Form, Input, Select} from "antd";
import {useTranslation} from "react-i18next";
import {SizeType} from "antd/es/config-provider/SizeContext";


export interface SelectItemOptions {
    value: string | number
    label: string
}


interface SelectItemProps {
    entity: any
    attribute: string
    disabled?: boolean
    options: SelectItemOptions[]
    useEmpty?: boolean
    size?: SizeType
}

export default function SelectItem({
                                       entity,
                                       attribute,
                                       disabled,
                                       options,
                                       useEmpty,
                                       size
                                   }: SelectItemProps) {


    //TODO dorobit search + odstranit diakritiku

    const [t] = useTranslation()

    return (
        <Form.Item
            label={`${t(attribute)}:`}
            style={{
                margin: 0
            }}
        >
            <Select
                size={size ?? "small"}
                disabled={disabled}
                defaultValue={entity[attribute] ?? ""}
                onChange={(value) => {
                    entity[attribute] = value
                }}
            >
                {
                    useEmpty && (
                        <Select.Option
                            key={""}
                            value={""}
                        >
                            {""}
                        </Select.Option>
                    )
                }

                {
                    options.map((option) => {
                        return (
                            <Select.Option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </Select.Option>
                        )
                    })

                }


            </Select>

        </Form.Item>
    )

}


interface SelectItemRawProps {
    children?: any
    entity: any
    attribute: string
    disabled?: boolean
    size?: SizeType
}

export function SelectItemRaw({
                                  children,
                                  entity,
                                  attribute,
                                  disabled,
                                  size
                              }: SelectItemRawProps) {

    //TODO dorobit search + odstranit diakritiku

    const [t] = useTranslation()

    return (
        <Form.Item
            label={`${t(attribute)}:`}
            style={{
                margin: 0
            }}
        >
            <Select
                size={size ?? undefined}
                disabled={disabled}
                defaultValue={entity[attribute] ?? ""}
                onChange={(value) => {
                    entity[attribute] = value
                }}
            >
                {
                    React.Children.toArray(children)
                }
            </Select>

        </Form.Item>
    )
}