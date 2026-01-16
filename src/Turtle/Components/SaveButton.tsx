import {Button} from "antd";
import {SaveTwoTone} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import IconSave from "@Turtle/Icons/IconSave"


interface SaveButtonProps {
    onClick?: (e: React.MouseEvent) => void;
}

export function SaveButton({
                               onClick
                           }: SaveButtonProps) {

    const [t] = useTranslation()

    return (
        <Button
            onClick={onClick}
            type={"text"}
            icon={<IconSave/>}
        >
            {t("save")}
        </Button>
    )
}