import {Form, Input, Select} from "antd";


export interface SelectItemOptions {
    value: string
    label: string
}


interface SelectItemProps {
    entity: any
    attribute: string
    disabled?: boolean
    options: SelectItemOptions[]
    useEmpty?: boolean
}

export default function SelectItem({
                                       entity,
                                       attribute,
                                       disabled,
                                       options,
                                       useEmpty
                                   }: SelectItemProps) {


    //TODO dorobit search + odstranit diakritiku

    return (
        <Form.Item
            label={attribute}
            style={{
                margin: 0
            }}
        >
            <Select
                size={"small"}
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