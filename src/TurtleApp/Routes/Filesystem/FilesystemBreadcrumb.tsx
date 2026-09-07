import React from "react";
import {useTranslation} from "react-i18next";
import {Breadcrumb, Select, Space} from "antd";
import {FolderOutlined, FolderFilled} from "@ant-design/icons";
import FilesApi from "./FilesApi";
import FileEntry from "./FileEntry";

interface FilesystemBreadcrumbProps {
    folderPath: string
    onNavigate: (path: string) => void
}

export default function FilesystemBreadcrumb({folderPath, onNavigate}: FilesystemBreadcrumbProps) {

    const [t] = useTranslation()

    const [siblings, setSiblings] = React.useState<Array<FileEntry>>([])

    const segments = folderPath ? folderPath.split("/") : []
    const parentPath = segments.slice(0, -1).join("/")
    const currentName = segments[segments.length - 1]

    React.useEffect(() => {
        if (!segments.length) {
            setSiblings([])
            return
        }
        FilesApi.ListFiles(parentPath).then((entries) => {
            setSiblings(entries.filter((entry) => entry.isDir))
        })
    }, [parentPath, segments.length])

    const items: Array<{ title: React.ReactNode }> = [
        {
            title: (
                <a onClick={() => onNavigate("")}>
                    <Space size={4}>
                        <FolderFilled/>
                        {t("filesystem")}
                    </Space>
                </a>
            )
        }
    ]

    segments.slice(0, -1).forEach((segment, index) => {
        const path = segments.slice(0, index + 1).join("/")
        items.push({
            title: (
                <a onClick={() => onNavigate(path)}>
                    {segment}
                </a>
            )
        })
    })

    if (segments.length) {
        items.push({
            title: (
                <Select
                    value={currentName}
                    variant={"borderless"}
                    size={"small"}
                    popupMatchSelectWidth={false}
                    style={{minWidth: 90, fontWeight: 600}}
                    onChange={(name) => onNavigate(parentPath ? `${parentPath}/${name}` : name)}
                    options={siblings.map((entry) => ({
                        value: entry.name,
                        label: (
                            <Space size={4}>
                                <FolderOutlined/>
                                {entry.name}
                            </Space>
                        )
                    }))}
                />
            )
        })
    }

    return (
        <Breadcrumb items={items}/>
    )
}
