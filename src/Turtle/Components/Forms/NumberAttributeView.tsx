import {Flex, Form, FormItemProps, Input, InputNumber, InputNumberProps} from "antd";
import {useTranslation} from "react-i18next";


interface IntegerPropertyViewProps {
    entity: any
    attribute: string
    label?: string
    behindLabel?: any
    onChange?: any
    inputProps?: InputNumberProps
    itemProps?: FormItemProps
    onSubmit?: () => void
}

export function IntegerAttributeView({
                                         entity,
                                         attribute,
                                         label,
                                         behindLabel,
                                         onChange,
                                         inputProps,
                                         itemProps,
                                         onSubmit
                                     }: IntegerPropertyViewProps) {
    const [t] = useTranslation()

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        onSubmit?.()
    }

    const handleChange = (value: number | null) => {
        entity[attribute] = value
        onChange && onChange()
    }

    return (
        <Form.Item
            label={`${t(label ?? attribute)}:`}
            {...itemProps}
        >
            <Flex align="center" gap="small">
                <Input
                    type={"number"}
                    defaultValue={entity[attribute] as any}
                    onChange={handleChange as any}
                    onKeyDown={(e) => e.key === "Enter" && handleKeyPress(e)}
                    precision={0}
                    {...inputProps}
                />
                {behindLabel && (
                    <div>
                        {behindLabel}
                    </div>
                )}
            </Flex>
        </Form.Item>
    )
}