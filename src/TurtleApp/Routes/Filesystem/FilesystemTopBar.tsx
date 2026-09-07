import React from "react";
import {useTranslation} from "react-i18next";
import {Button, Flex, Input, Progress, Upload} from "antd";
import {FolderAddOutlined, UploadOutlined} from "@ant-design/icons";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import FilesApi from "./FilesApi";
import FilesystemBreadcrumb from "./FilesystemBreadcrumb";
import TurtleApp from "@TurtleApp/TurtleApp";

interface FilesystemTopBarProps {
    folderPath: string
    onChanged: () => void
    onNavigateFolder: (path: string) => void
}

export default function FilesystemTopBar({folderPath, onChanged, onNavigateFolder}: FilesystemTopBarProps) {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const [uploadProgress, setUploadProgress] = React.useState<number | null>(null)

    function createFolder() {

        let folderName = ""

        activate({
            title: t("create.folder"),
            content: (
                <Flex vertical gap={15}>
                    <Input
                        placeholder={t("name") as string}
                        onChange={(e) => folderName = e.target.value}
                    />
                    <RightSubmitButton
                        label={"create"}
                        onClick={async () => {
                            if (!folderName) {
                                return
                            }
                            deactivate()
                            TurtleApp.Lock()
                            await FilesApi.CreateFolder(folderPath ? `${folderPath}/${folderName}` : folderName)
                            TurtleApp.Unlock()
                            onChanged()
                        }}
                    />
                </Flex>
            )
        })
    }

    async function uploadFile(file: File) {
        const path = folderPath ? `${folderPath}/${file.name}` : file.name

        setUploadProgress(0)
        try {
            await FilesApi.UploadFile(path, file, setUploadProgress)
            onChanged()
        } finally {
            setUploadProgress(null)
        }
    }

    return (
        <Flex justify={"space-between"} align={"center"} flex={1} gap={10}>
            <FilesystemBreadcrumb
                folderPath={folderPath}
                onNavigate={onNavigateFolder}
            />

            <Flex align={"center"} gap={10}>
                {uploadProgress !== null && (
                    <Progress
                        style={{width: "120px"}}
                        percent={uploadProgress}
                        size={"small"}
                    />
                )}

                <Button
                    icon={<FolderAddOutlined/>}
                    onClick={createFolder}
                    type="text"
                >
                    {t("create.folder")}
                </Button>

                <Upload
                    showUploadList={false}
                    disabled={uploadProgress !== null}
                    beforeUpload={(file) => {
                        uploadFile(file)
                        return false
                    }}
                >
                    <Button
                        icon={<UploadOutlined/>}
                        disabled={uploadProgress !== null}
                        type="text"
                    >
                        {t("upload")}
                    </Button>
                </Upload>
            </Flex>
        </Flex>
    )
}
