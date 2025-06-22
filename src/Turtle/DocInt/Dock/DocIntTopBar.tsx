import React from "react"
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import {Button, Space} from "antd";
import {FileSearchOutlined, SearchOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

export default function DocIntTopBar() {
    return (
        <TopBarWrapper>
            <_SearchAll/>
        </TopBarWrapper>
    )
}

function _SearchAll({}) {

    const [t] = useTranslation()


    return (
        <Button
            type={"text"}
        >
            <Space>
                <SearchOutlined/>
                {t("ai.search")}
            </Space>
        </Button>
    )
}