import React from "react";
import {useTranslation} from "react-i18next";
import {Button, Flex, Input, Typography} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import FilesApi from "./FilesApi";
import {getFileKind} from "./FileKind";
import TurtleApp from "@TurtleApp/TurtleApp";

interface FileViewerProps {
    path: string
    extension?: string
}

function extensionFromPath(path: string): string {
    const name = path.split("/").pop() ?? path
    const dot = name.lastIndexOf(".")
    return dot > 0 ? name.slice(dot + 1) : ""
}

export default function FileViewer({path, extension}: FileViewerProps) {

    const [t] = useTranslation()

    const [content, setContent] = React.useState("")

    const kind = getFileKind(extension ?? extensionFromPath(path))

    React.useEffect(() => {
        if (!path || kind !== "text") {
            setContent("")
            return
        }
        FilesApi.ReadFile(path).then(setContent)
    }, [path, kind])

    async function save() {
        TurtleApp.Lock()
        await FilesApi.WriteFile(path, content)
        TurtleApp.Unlock()
    }

    if (!path) {
        return (
            <Flex
                align={"center"}
                justify={"center"}
                style={{height: "100%"}}
            >
                <Typography.Text type={"secondary"}>
                    {t("select.a.file")}
                </Typography.Text>
            </Flex>
        )
    }

    if (kind === "image") {
        return (
            <Flex vertical gap={10} style={{height: "100%", padding: "15px"}}>
                <Typography.Text strong>{path}</Typography.Text>
                <Flex flex={1} align={"center"} justify={"center"} style={{overflow: "auto"}}>
                    <img
                        src={FilesApi.RawFileUrl(path)}
                        alt={path}
                        style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}}
                    />
                </Flex>
            </Flex>
        )
    }

    if (kind === "pdf") {
        return (
            <Flex vertical gap={10} style={{height: "100%", padding: "15px"}}>
                <Typography.Text strong>{path}</Typography.Text>
                <iframe
                    title={path}
                    src={FilesApi.RawFileUrl(path)}
                    style={{flex: 1, border: "none"}}
                />
            </Flex>
        )
    }

    if (kind === "video") {
        return (
            <Flex vertical gap={10} style={{height: "100%", padding: "15px"}}>
                <Typography.Text strong>{path}</Typography.Text>
                <Flex flex={1} align={"center"} justify={"center"}>
                    <video
                        controls
                        src={FilesApi.RawFileUrl(path)}
                        style={{maxWidth: "100%", maxHeight: "100%"}}
                    />
                </Flex>
            </Flex>
        )
    }

    if (kind === "audio") {
        return (
            <Flex vertical gap={15} justify={"center"} style={{height: "100%", padding: "15px"}}>
                <Typography.Text strong>{path}</Typography.Text>
                <audio controls src={FilesApi.RawFileUrl(path)} style={{width: "100%"}}/>
            </Flex>
        )
    }

    if (kind === "binary") {
        return (
            <Flex
                vertical
                gap={15}
                align={"center"}
                justify={"center"}
                style={{height: "100%", padding: "15px"}}
            >
                <Typography.Text strong>{path}</Typography.Text>
                <Typography.Text type={"secondary"}>{t("no.preview.available")}</Typography.Text>
                <Button
                    icon={<DownloadOutlined/>}
                    href={FilesApi.RawFileUrl(path)}
                    target={"_blank"}
                    rel={"noreferrer"}
                >
                    {t("download")}
                </Button>
            </Flex>
        )
    }

    return (
        <Flex
            vertical
            gap={10}
            style={{height: "100%", padding: "15px"}}
        >
            <Flex justify={"space-between"} align={"center"}>
                <Typography.Text strong>{path}</Typography.Text>
                <Button type={"primary"} onClick={save}>
                    {t("save")}
                </Button>
            </Flex>

            <Input.TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                    flex: 1,
                    fontFamily: "monospace",
                    resize: "none"
                }}
            />
        </Flex>
    )
}
