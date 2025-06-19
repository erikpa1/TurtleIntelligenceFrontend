import {PropertyParent, StringProperty} from "@Turtle/Data/Properties";
import {Flex, Form, Input, Space} from "antd";
import {useTranslation} from "react-i18next";


interface StringPropertyViewProps {
    entity: any
    attribute: string
    label?: string
    behindLabel?: any
    onChange?: any
}


export default function StringAttributeView({
                                                entity,
                                                attribute,
                                                label,
                                                behindLabel,
                                                onChange
                                            }: StringPropertyViewProps) {
    const [t] = useTranslation()

    return (
        <Form.Item label={`${t(label ?? attribute)}:`}>
            <Flex align="center" gap="small">
                <Input
                    defaultValue={entity[attribute]}
                    onChange={(e) => {
                        entity[attribute] = e.target.value
                        onChange && onChange()
                    }}
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

