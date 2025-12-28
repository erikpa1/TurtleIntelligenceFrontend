import {FormItemProps, InputProps} from "antd";
import {useTranslation} from "react-i18next";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import ObjectIdApi from "@Turtle/Utils/ObjectIdApi"
import TurtleApp from "@TurtleApp/TurtleApp"
import {useRefreshKey} from "@Turtle/Utils/useRefreshKey"


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



export function UidConvertableAttributeView(props: UidProps) {

    const [key, refreshKey] = useRefreshKey()

    const [t] = useTranslation()

    async function changed() {
        TurtleApp.Lock()
        const newUid = await ObjectIdApi.GetObjectIdFromString(props.entity[props.attribute])
        console.log(newUid)
        props.entity[props.attribute] = newUid
        TurtleApp.Unlock()
        refreshKey()
    }

    return (
        <StringAttributeView
            key={key}
            {...props}
            onSubmit={changed}
        />
    )
}


