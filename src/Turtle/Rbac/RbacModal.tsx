import {Flex} from "antd";
import React from "react";
import RbacApi from "@Turtle/Rbac/RbacApi";

interface RbacModalProps {
    api: string
}

export default function RbacModal({api}: RbacModalProps) {

    const [roles, setRoles] = React.useState<string[]>([])

    async function refreshRbac() {
        setRoles(await RbacApi.ListApi(api))
    }

    React.useEffect(() => {
        refreshRbac()
    }, [api])

    return (
        <Flex
            vertical
        >
            {
                roles.map((val) => {
                    return (
                        <div key={val}>
                            {val}
                        </div>
                    )
                })
            }
        </Flex>
    )
}