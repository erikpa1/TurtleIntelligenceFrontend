import {FormItemProps, InputProps} from "antd";
import {useTranslation} from "react-i18next";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";


interface UidProps {
    entity: any
    attribute: string
    label?: string
    behindLabel?: any
    onChange?: any
    inputProps?: InputProps
    itemProps?: FormItemProps
}


export default function UidAttributeView(props: UidProps) {
    const [t] = useTranslation()

    return (
        <StringAttributeView {...props} inputProps={{disabled: true}}/>
    )
}

