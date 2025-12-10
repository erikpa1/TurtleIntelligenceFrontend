import {Button} from "antd";
import {SaveTwoTone} from "@ant-design/icons";
import {useTranslation} from "react-i18next";


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
            icon={<SaveTwoTone/>}
        >
            {"save"}
        </Button>
    )
}