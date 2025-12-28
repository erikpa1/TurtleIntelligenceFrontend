import {PropertyParent, StringProperty} from "@Turtle/Data/Properties";
import {Flex, Form, FormItemProps, Input, InputProps, Space} from "antd";
import {useTranslation} from "react-i18next";


interface StringPropertyViewProps {
    entity: any
    attribute: string
    label?: string
    behindLabel?: any
    onChange?: any
    inputProps?: InputProps
    itemProps?: FormItemProps
    onSubmit?: () => void
}

export default function StringAttributeView({
                                                entity,
                                                attribute,
                                                label,
                                                behindLabel,
                                                onChange,
                                                inputProps,
                                                itemProps,
                                                onSubmit
                                            }: StringPropertyViewProps) {
    const [t] = useTranslation()

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        onSubmit?.()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        entity[attribute] = e.target.value
        onChange && onChange()
    }

    return (
        <Form.Item
            label={`${t(label ?? attribute)}:`}
            {...itemProps}
        >
            <Flex align="center" gap="small">
                <Input
                    defaultValue={entity[attribute]}
                    onChange={handleChange}
                    onPressEnter={handleKeyPress}
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