import {PropertyParent, StringProperty} from "@Turtle/Data/Properties";
import {Flex, Form, Input, Space} from "antd";
import {useTranslation} from "react-i18next";


interface StringPropertyViewProps {
    entity: any
    property: StringProperty
    behindLabel?: any
}


export default function StringPropertyView({
                                               entity,
                                               property,
                                               behindLabel
                                           }: StringPropertyViewProps) {

    const [t] = useTranslation()


    return (
        <Form.Item label={`${t(property.label)}:`}>
            <Flex>
                <Input
                    defaultValue={entity[property.key]}
                    onChange={(e) => {
                        entity[property.key] = e.target.value
                    }}
                />

                {
                    behindLabel && (
                        <div style={{
                            marginLeft: "5px"
                        }}>
                            {behindLabel}
                        </div>
                    )
                }
            </Flex>

        </Form.Item>
    )
}