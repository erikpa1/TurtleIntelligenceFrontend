import React from "react"
import {Button, Space} from "antd";
import IconNetworkIntelNode from "@Turtle/Icons/IconNetworkIntelNode";
import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal"
import CopilotChatBubble from "@Turtle/Copilot/CopilotChatBubble"


interface CopilotButtonProps {
    context: string
}


export function CopilotButton({context}: CopilotButtonProps) {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    function showChat() {
        activate({
            title: t("copilot"),
            content: (
                <CopilotChatBubble context={context}/>
            )
        })
    }

    return (
        <Button
            type={"text"}
            onClick={showChat}
        >
            <Space>
                <IconNetworkIntelNode/>
                {t("copilot")}
            </Space>
        </Button>
    )
}


export function CopilotPlusVSearch({}) {

    const [t] = useTranslation()

    return (
        <Button
            type={"text"}
            icon={<IconNetworkIntelNode/>}
        >
            {t("copilot")} + Vsearch
        </Button>
    )
}