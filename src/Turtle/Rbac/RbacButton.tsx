import {Button} from "antd";
import {useTranslation} from "react-i18next";
import IconHub from "@TurtleIcons/IconHub";


interface RbacButtonProps {
    modulesRoute: string
}

export function RbacButton({modulesRoute}: RbacButtonProps) {

    const [t] = useTranslation()

    return (
        <Button
            type={"text"}
            icon={<IconHub/>}
        >
            RBAC
        </Button>
    )
}