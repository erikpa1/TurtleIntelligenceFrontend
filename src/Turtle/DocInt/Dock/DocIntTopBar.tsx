import React from "react"
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import {Button, Space} from "antd";
import {FileSearchOutlined, SearchOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import VSearchView from "@Turtle/DocInt/Dock/VSearchView";

export default function DocIntTopBar() {
    return (
        <TopBarWrapper>
            <_SearchAll/>
        </TopBarWrapper>
    )
}

function _SearchAll({}) {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    function activateSearch({}) {
        activate({
            title: "VSearch",
            closable: true,
            content: (
                <VSearchView/>
            )
        })
    }

    return (
        <Button
            type={"text"}
            onClick={activateSearch}
        >
            <Space>
                <SearchOutlined/>
                {t("vsearch")}
            </Space>
        </Button>
    )
}