import {PropertyParent, StringProperty} from "@Turtle/Data/Properties";
import {Form, FormItemProps, Input} from "antd";
import {useTranslation} from "react-i18next";
import TextArea from "antd/es/input/TextArea";
import {TextAreaProps} from "antd/lib/input";


interface StringPropertyViewProps {
    entity: any
    property: StringProperty
    areaProps?: TextAreaProps
}


export default function StringAreaPropertyView({entity, property}: StringPropertyViewProps) {

    const [t] = useTranslation()


    return (
        <Form.Item label={`${t(property.label)}:`}>
            <TextArea
                defaultValue={entity[property.key]}
                onChange={(e) => {
                    entity[property.key] = e.target.value
                }}
            />
        </Form.Item>
    )
}

interface StringAreaViewProps {
    entity: any
    attribute: string
    itemProps?: FormItemProps
    areaProps?: TextAreaProps
}


export function StringAreaAttributeView({
                                            entity,
                                            attribute,
                                            areaProps,
                                            itemProps

                                        }: StringAreaViewProps) {

    const [t] = useTranslation()


    return (
        <Form.Item
            label={`${t(attribute)}:`}
            {...itemProps}
        >
            <TextArea
                defaultValue={entity[attribute]}
                onChange={(e) => {
                    entity[attribute] = e.target.value
                }}
                {...areaProps}
            />
        </Form.Item>
    )
}