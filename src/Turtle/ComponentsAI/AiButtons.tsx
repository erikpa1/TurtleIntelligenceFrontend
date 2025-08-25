import React from "react"
import {Button, Space} from "antd";
import IconNetworkIntelNode from "@Turtle/Icons/IconNetworkIntelNode";
import {useTranslation} from "react-i18next";


export function CopilotButton({}) {

    const [t] = useTranslation()

    return (
        <Button
            type={"text"}
        >
            <Space>
                <IconNetworkIntelNode/>
                {"copilot"}
            </Space>
        </Button>
    )
}