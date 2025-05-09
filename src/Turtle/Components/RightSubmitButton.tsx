import {Button, Flex} from "antd";


export function RightSubmitButton({onClick}) {
    return (
        <Flex
            align={"end"}
            flex={1}
        >
            <Button
                onClick={onClick}
            >
                {"submit"}
            </Button>

        </Flex>
    )
}