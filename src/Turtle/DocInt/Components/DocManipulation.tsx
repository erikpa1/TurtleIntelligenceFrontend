import React from "react"
import {FileDocument} from "@Turtle/DocInt/Data/Document";
import {Button} from "antd";
import {DownloadOutlined, EyeOutlined} from "@ant-design/icons";


interface ViewDocumentIconProps {
    doc: FileDocument
}

export function OpenDocumentIconBtn({doc}: ViewDocumentIconProps) {

    function viewClicked() {
        console.log("Here")
    }

    return (
        <Button
            type="text"
            size="small"
            icon={<EyeOutlined/>}
            style={{width: '32px', height: '32px'}}
            onClick={viewClicked}
        />
    )


}

export function DownloadDocumentIconBtn({doc}: ViewDocumentIconProps) {

    function downloadClicked() {
        console.log("Here")
    }


    return (
        <Button
            type="text"
            size="small"
            icon={<DownloadOutlined/>}
            style={{width: '32px', height: '32px'}}
            onClick={downloadClicked}
        />
    )


}