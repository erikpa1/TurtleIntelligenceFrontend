import {Flex, Segmented} from "antd"
import React from "react"
import TopBarWrapper from "@Turtle/Components/TopBarWrapper"
import {AppstoreOutlined, BarsOutlined} from "@ant-design/icons";
import {useActiveFlowEditor} from "@Turtle/Flows/flowEditorZus";


export default function FlowsTopBar() {
    return (
        <TopBarWrapper>
            <Flex
                align={"center"}
                justify="end"  // In Ant Design, "end" is an alias for "flex-end"
                flex={1}
                gap={5}
            >
                <_ViewAs/>
            </Flex>
        </TopBarWrapper>
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