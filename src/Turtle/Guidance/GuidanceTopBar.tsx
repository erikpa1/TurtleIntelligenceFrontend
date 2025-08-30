import React from "react"
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import {Button, Space} from "antd";
import {FileSearchOutlined, SearchOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import VSearchView from "@Turtle/DocInt/Components/VSearchView";

export default function GuidanceTopBar() {
    return (
        <TopBarWrapper>
            <_ImportDocument/>
        </TopBarWrapper>
    )
}

function _ImportDocument({}) {

    const [t] = useTranslation()

    const {activate} = useTurtleModal()

    function activateSearch({}) {

    }

    return (
        <Button
            type={"text"}
            onClick={activateSearch}
        >
            <Space>
                <SearchOutlined/>
                {t("import.document")}
            </Space>
        </Button>
    )
}