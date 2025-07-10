import {Button, Flex} from "antd";
import {useTranslation} from "react-i18next";

interface RightSubmitButtonProps {
    label?: string;
    onClick: (e: any) => void
    disabled?: boolean
}

export function RightSubmitButton({
                                      onClick,
                                      label,
                                      disabled
                                  }: RightSubmitButtonProps) {

    const [t] = useTranslation()

    return (
        <Flex
            justify="end"  // In Ant Design, "end" is an alias for "flex-end"
            flex={1}
        >
            <Button
                onClick={onClick}
                type={"primary"}
                disabled={disabled}
            >
                {t(label ?? "submit")}
            </Button>

        </Flex>
    )
}

export function RightSubmitHtmlButton({onClick}) {

    const [t] = useTranslation()

    return (
        <Flex
            justify="end"  // In Ant Design, "end" is an alias for "flex-end"
            flex={1}
        >
            <Button
                onClick={onClick}
                type={"primary"}
                htmlType={"button"}
            >
                {t("submit")}
            </Button>

        </Flex>
    )
}