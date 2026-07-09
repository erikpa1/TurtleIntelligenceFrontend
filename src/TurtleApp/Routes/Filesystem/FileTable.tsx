import React from "react";
import {useTranslation} from "react-i18next";
import {Space, Table, TableProps, Typography} from "antd";
import {FileOutlined, FolderFilled, FolderOpenOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {
    HierarchyCustomIcon,
    HierarchyDeleteButton,
    HierarchyViewButton
} from "@Turtle/Components/HierarchyComponents";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import FilesApi from "./FilesApi";
import FileEntry from "./FileEntry";
import FileViewer from "./FileViewer";
import TurtleApp from "@TurtleApp/TurtleApp";

interface FileTableProps {
    folderPath: string
    reloadToken?: number
    onSelectFolder?: (path: string) => void
}

function formatBytes(size: number): string {
    if (!size) {
        return "0 B"
    }
    const units = ["B", "KB", "MB", "GB"]
    const exponent = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1)
    const value = size / Math.pow(1024, exponent)
    return `${exponent === 0 ? value : value.toFixed(1)} ${units[exponent]}`
}

export default function FileTable({folderPath, reloadToken, onSelectFolder}: FileTableProps) {

    const [t] = useTranslation()

    const {activate} = useTurtleModal()

    const [files, setFiles] = React.useState<Array<FileEntry>>([])

    async function refresh() {
        const entries = await FilesApi.ListFiles(folderPath)
        entries.sort((a, b) => {
            if (a.isDir !== b.isDir) {
                return a.isDir ? -1 : 1
            }
            return a.name.localeCompare(b.name)
        })
        setFiles(entries)
    }

    React.useEffect(() => {
        refresh()
    }, [folderPath, reloadToken])

    async function deleteFile(path: string) {
        TurtleApp.Lock()
        await FilesApi.DeleteEntry(path)
        TurtleApp.Unlock()
        refresh()
    }

    function previewFile(entry: FileEntry) {
        activate({
            title: entry.name,
            width: 800,
            content: (
                <div style={{height: "60vh"}}>
                    <FileViewer path={entry.path} extension={entry.extension}/>
                </div>
            )
        })
    }

    function openFolder(entry: FileEntry) {
        onSelectFolder && onSelectFolder(entry.path)
    }

    const columns: TableProps<FileEntry>['columns'] = [
        {
            title: t("name"),
            dataIndex: "name",
            key: "name",
            render: (name, entry) => entry.isDir ? (
                <a onClick={() => openFolder(entry)}>
                    <Space>
                        <FolderFilled style={{color: "#e8b339"}}/>
                        <Typography.Text strong>{name}</Typography.Text>
                    </Space>
                </a>
            ) : (
                <Space>
                    <FileOutlined/>
                    {name}
                </Space>
            )
        },
        {
            title: t("size"),
            dataIndex: "size",
            key: "size",
            width: 120,
            render: (size, entry) => entry.isDir
                ? <Typography.Text type={"secondary"}>{entry.count} {t("items")}</Typography.Text>
                : formatBytes(size)
        },
        {
            title: t("modified"),
            dataIndex: "modified",
            key: "modified",
            width: 200,
            render: (modified) => modified ? dayjs(modified).format("YYYY-MM-DD HH:mm") : ""
        },
        {
            title: t("actions"),
            key: "actions",
            width: 100,
            render: (_, entry) => (
                <Space>
                    {entry.isDir ? (
                        <HierarchyCustomIcon
                            icon={<FolderOpenOutlined/>}
                            onClick={() => openFolder(entry)}
                        />
                    ) : (
                        <HierarchyViewButton onClick={() => previewFile(entry)}/>
                    )}
                    <HierarchyDeleteButton onClick={() => deleteFile(entry.path)}/>
                </Space>
            )
        }
    ]

    return (
        <Table
            rowKey={"path"}
            pagination={false}
            bordered
            size={"small"}
            dataSource={files}
            columns={columns}
            locale={{emptyText: t("no.files")}}
            style={{padding: "15px"}}
            onRow={(entry) => ({
                onDoubleClick: () => entry.isDir ? openFolder(entry) : previewFile(entry),
                style: entry.isDir ? {cursor: "pointer"} : undefined
            })}
        />
    )
}
