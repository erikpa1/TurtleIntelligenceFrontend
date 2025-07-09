import {Button, Flex, Segmented} from "antd"
import React from "react"
import TopBarWrapper from "@Turtle/Components/TopBarWrapper"
import {AppstoreOutlined, BarsOutlined, SaveOutlined} from "@ant-design/icons"
import {useActiveFlowEditor} from "@Turtle/Flows/flowEditorZus"
import {Flow} from "@Turtle/Flows/Flow"
import {useTranslation} from "react-i18next"
import TurtleApp from "@TurtleApp/TurtleApp"
import FlowsApi from "@Turtle/Flows/FlowsApi"

interface FlowsTopBarProps {
    flow: Flow | null
}

export default function FlowsTopBar({flow}: FlowsTopBarProps) {
    return (
        <TopBarWrapper>

            <Flex>
                <_SaveBtn flow={flow}/>
            </Flex>

            <Flex
                align={"center"}
                justify="end"
                flex={1}
                gap={5}
            >
                <_ViewAs/>
            </Flex>
        </TopBarWrapper>
    )
}

function _SaveBtn({flow}: FlowsTopBarProps) {


    const [t] = useTranslation()

    async function savePressed() {
        if (flow) {
            TurtleApp.Lock()
            await FlowsApi.COU(flow)
            TurtleApp.Unlock()
        }
    }


    return (
        <Button
            onClick={savePressed}
            type={"text"}
            disabled={!Boolean(flow)}
        >
            <SaveOutlined/>
            {t("save")}
        </Button>
    )

}


function _ViewAs({}) {

    const {viewType, setViewType} = useActiveFlowEditor()

    return (
        <Segmented
            value={viewType}
            onChange={setViewType}
            options={[
                {value: 0, icon: <BarsOutlined/>},
                {value: 1, icon: <AppstoreOutlined/>},
            ]}
        />
    )
}