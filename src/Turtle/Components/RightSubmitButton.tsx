import {Button, Flex} from "antd";
import {useTranslation} from "react-i18next";


export function RightSubmitButton({onClick}) {

    const [t] = useTranslation()

    return (
        <Flex
            justify="end"  // In Ant Design, "end" is an alias for "flex-end"
            flex={1}
        >
            <Button
                onClick={onClick}
                type={"primary"}
            >
                {t("submit")}
            </Button>

        </Flex>
    )
}