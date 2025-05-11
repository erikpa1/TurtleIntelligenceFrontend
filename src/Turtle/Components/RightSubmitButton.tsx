import {Button, Flex} from "antd";


export function RightSubmitButton({onClick}) {
    return (
        <Flex
            justify="end"  // In Ant Design, "end" is an alias for "flex-end"
            flex={1}
        >
            <Button
                onClick={onClick}
                type={"primary"}
            >
                {"submit"}
            </Button>

        </Flex>
    )
}