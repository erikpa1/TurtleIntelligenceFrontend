import {Button, Flex} from "antd";
import {PlayCircleOutlined, SettingOutlined} from "@ant-design/icons";
import React from "react";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useTranslation} from "react-i18next";
import ConnectionsNumberingButton from "@TurtleSim/SimModelWorldDock/TopBar/ConnectionsNumbeingButton";

export function TopBarSettingsButton() {

    const [t] = useTranslation()
    const {activate} = useTurtleModal()

    function settingsPressed() {

        activate({
            title: "sim.config",
            content: (
                <Flex vertical>
                    <ConnectionsNumberingButton/>
                </Flex>
            )
        })

    }

    return (
        <Button
            onClick={settingsPressed}
            type={"text"}
            icon={<SettingOutlined/>}
       />
    )
}
