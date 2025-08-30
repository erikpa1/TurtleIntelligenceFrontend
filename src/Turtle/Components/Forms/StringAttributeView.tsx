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
}


export default function StringAttributeView({
                                                entity,
                                                attribute,
                                                label,
                                                behindLabel,
                                                onChange,
                                                inputProps,
                                                itemProps
                                            }: StringPropertyViewProps) {
    const [t] = useTranslation()

    return (
        <Form.Item
            label={`${t(label ?? attribute)}:`}
            {...itemProps}
        >
            <Flex align="center" gap="small">
                <Input
                    defaultValue={entity[attribute]}
                    onChange={(e) => {
                        entity[attribute] = e.target.value
                        onChange && onChange()
                    }}
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

