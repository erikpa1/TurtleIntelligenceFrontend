import React from "react"
import {Button} from "antd";
import {SettingOutlined} from "@ant-design/icons";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";

export default function SimConfigSettingsButton({}) {

    const {activate, deactivate} = useTurtleModal()

    function configClicked() {
        activate({
            title: "sim.config",
            content: (
                <SimConfigModal/>
            ),
            closable: true,
        })
    }


    return (
        <Button
            type={"primary"}
            onClick={configClicked}
            style={{
                paddingRight: "5px",
                paddingLeft: "5px"
            }}
        >
            <SettingOutlined/>
        </Button>
    )
}

function SimConfigModal({}) {
    return (
        <div>

        </div>
    )
}