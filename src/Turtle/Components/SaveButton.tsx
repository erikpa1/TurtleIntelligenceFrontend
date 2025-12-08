import {Button} from "antd";
import {SaveTwoTone} from "@ant-design/icons";
import {useTranslation} from "react-i18next";


export function SaveButton({}) {

    const [t] = useTranslation()

    return (
        <Button
            type={"text"}
            icon={<SaveTwoTone/>}
        >
            {"save"}
        </Button>
    )
}