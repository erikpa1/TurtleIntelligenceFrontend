import React from "react"
import {Form, Input, message, Upload, UploadFile, UploadProps} from "antd"
import {useTranslation} from "react-i18next"
import {FilePdfOutlined, InboxOutlined} from "@ant-design/icons"
import {UploadDocumentFileParams} from "@Turtle/DocInt/Api/Params"
import {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView"
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView"
import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView"
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";
import DocumentsApi from "@Turtle/DocInt/Api/DocumentsApi";

export default function CreateDocumentView({
                                               beforeUpdate,
                                               afterUpdate,
                                           }) {

    const [t] = useTranslation()

    const [fileToUpload, setFileToUpload] = React.useState<File | UploadFile | null>(null)

    const [documentCreation] = React.useState(new UploadDocumentFileParams())

    const [descVisible, setDescVisible] = React.useState(documentCreation.llmDescription)

    async function submitClicked() {
        TurtleApp.Lock()
        await DocumentsApi.UploadDocument(fileToUpload as File, documentCreation)
        TurtleApp.Unlock()
    }


    return (
        <Form layout={"vertical"}>

            <StringAttributeView
                entity={documentCreation}
                attribute={"name"}
            />

            <BoolAttributeView
                entity={documentCreation}
                attribute={"llmDescription"}
                onChange={() => {
                    setDescVisible(documentCreation.llmDescription)
                }}
            />

            {
                descVisible === false && (
                    <StringAreaAttributeView
                        entity={documentCreation}
                        attribute={"description"}
                    />
                )
            }

            <Form.Item>
                <Upload.Dragger
                    name={'file'}
                    multiple={false}
                    accept={"application/pdf"}
                    onChange={(e) => {
                        if (e.fileList.length > 0) {
                            const file = e.fileList[0]
                            setFileToUpload(file)
                        }
                    }}
                    beforeUpload={() => {
                        return false
                    }}
                >
                    <p className="ant-upload-drag-icon">
                        <FilePdfOutlined/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>

                    <p className="ant-upload-hint">
                        .pdf
                    </p>
                </Upload.Dragger>
            </Form.Item>

            <RightSubmitButton
                disabled={Boolean(fileToUpload) === false}
                onClick={submitClicked}
            />
        </Form>
    )

}