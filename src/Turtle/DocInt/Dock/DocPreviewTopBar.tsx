import React from "react"
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import {Space} from "antd";
import {FileDocument} from "@Turtle/DocInt/Data/Document";

interface FileDocumentProps {
    doc: FileDocument
}

export default function DocPreviewTopBar({doc}: FileDocumentProps) {
    return (
        <TopBarWrapper>
            <Space>
                <div>#Faktura</div>
            </Space>
        </TopBarWrapper>

    )
}