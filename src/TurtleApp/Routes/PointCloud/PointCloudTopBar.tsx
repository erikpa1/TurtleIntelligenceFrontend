import React from "react";
import {useTranslation} from "react-i18next";
import {Button, Flex, Progress, Typography, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import PointCloudApi from "./PointCloudApi";

interface PointCloudTopBarProps {
    onUploaded: (cloudUid: string) => void
}

export default function PointCloudTopBar({onUploaded}: PointCloudTopBarProps) {

    const [t] = useTranslation()

    const [uploadProgress, setUploadProgress] = React.useState<number | null>(null)

    async function uploadFile(file: File) {
        setUploadProgress(0)
        try {
            const cloudUid = await PointCloudApi.UploadFile(file.name, file, setUploadProgress)
            onUploaded(cloudUid)
        } finally {
            setUploadProgress(null)
        }
    }

    return (
        <Flex justify={"space-between"} align={"center"} flex={1} gap={10}>
            <Typography.Text strong>{t("pointclouds")}</Typography.Text>

            <Flex align={"center"} gap={10}>
                {uploadProgress !== null && (
                    <Progress
                        style={{width: "120px"}}
                        percent={uploadProgress}
                        size={"small"}
                    />
                )}

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
                    >
                        {t("upload.point.cloud")}
                    </Button>
                </Upload>
            </Flex>
        </Flex>
    )
}
