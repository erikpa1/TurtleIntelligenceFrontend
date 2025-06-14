import React from "react"
import {Form, Input, message, Upload, UploadProps} from "antd";
import {useTranslation} from "react-i18next";
import {InboxOutlined} from "@ant-design/icons";

export default function CreateDocumentView({}) {

    const [t] = useTranslation()

    const [docName, setDocName] = React.useState("")


    function nameChange(newName: string) {
        setDocName(newName)
    }

    function beforeUpload(data: any) {
        console.log(data)
    }

    function afterUpload(data: any) {
        console.log(data)
    }

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            const {status} = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };


    return (
        <Form layout={"vertical"}>

            <Form.Item label={`${t("name")}:`}>
                <Input
                    value={docName}
                    onChange={(e) => {
                        nameChange(e.target.value)
                    }}
                />
            </Form.Item>

            <Form.Item label={`${t("description")}:`}>
                <Input
                    value={docName}
                    onChange={(e) => {
                        nameChange(e.target.value)
                    }}
                />
            </Form.Item>

            <div>
                <Upload {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        .pdf
                    </p>
                </Upload>
            </div>
        </Form>
    )

}