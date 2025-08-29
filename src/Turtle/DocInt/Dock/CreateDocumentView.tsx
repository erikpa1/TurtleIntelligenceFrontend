import React from "react"
import {Col, Flex, Form, Input, message, Row, Tabs, Upload, UploadFile, UploadProps} from "antd"
import {useTranslation} from "react-i18next"
import {FilePdfOutlined, InboxOutlined} from "@ant-design/icons"
import {UploadDocumentFileParams} from "@Turtle/DocInt/Api/Params"
import {BoolAttributeView} from "@Turtle/Components/Forms/BoolPropertyView"
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView"
import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView"
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import TurtleApp from "@TurtleApp/TurtleApp";
import DocumentsApi from "@Turtle/DocInt/Api/DocumentsApi";
import {FileDocument} from "@Turtle/DocInt/Data/Document";

export default function CreateDocumentView({
                                               beforeUpdate,
                                               afterUpdate,
                                           }) {


    const [t] = useTranslation()

    const [activateTab, setActivateTab] = React.useState("upload")


    return (
        <Flex vertical={true}>

            <Tabs
                defaultActiveKey="url"
                centered
                size={"small"}
                onChange={setActivateTab}
                items={[
                    {
                        label: t("upload"),
                        key: "upload",
                    },
                    {
                        label: t("generate"),
                        key: "generate",
                    }
                ]}
            />


            {
                activateTab === "upload" && (
                    <_UploadDocumentView
                        beforeUpdate={beforeUpdate}
                        afterUpdate={afterUpdate}
                    />
                )
            }

            {
                activateTab === "generate" && (
                    <_GenerateDocumentView
                        beforeUpdate={beforeUpdate}
                        afterUpdate={afterUpdate}
                    />
                )
            }


        </Flex>
    )
}

function _GenerateDocumentView({
                                   beforeUpdate,
                                   afterUpdate,
                               }) {

    return (
        <div>

        </div>
    )

}

function _UploadDocumentView({
                                 beforeUpdate,
                                 afterUpdate,
                             }) {

    const [t] = useTranslation()

    const [fileToUpload, setFileToUpload] = React.useState<UploadFile | null>(null)

    const [documentCreation] = React.useState(new UploadDocumentFileParams())

    const [descVisible, setDescVisible] = React.useState(documentCreation.llmDescription)

    async function submitClicked() {

        if (fileToUpload) {
            beforeUpdate()
            TurtleApp.Lock()
            await DocumentsApi.UploadDocument(fileToUpload.originFileObj as any, documentCreation)
            TurtleApp.Unlock()
            afterUpdate()
        }

    }

    return (
        <Form layout={"vertical"}>

            <StringAttributeView
                entity={documentCreation}
                attribute={"name"}
            />

            <Row gutter={24}>
                <Col>
                    <BoolAttributeView
                        entity={documentCreation}
                        attribute={"llmDescription"}
                        onChange={() => {
                            setDescVisible(documentCreation.llmDescription)
                        }}
                    />
                </Col>

                <Col>
                    <BoolAttributeView
                        entity={documentCreation}
                        attribute={"createEmbedding"}
                        onChange={() => {
                            setDescVisible(documentCreation.createEmbedding)
                        }}
                    />
                </Col>
            </Row>

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
                            const file = Array.from(e.fileList)[0]
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

interface EditDocumentViewProps {
    doc: FileDocument,
    beforeUpdate: any,
    afterUpdate: any,
}

export function EditDocumentView({
                                     doc,
                                     beforeUpdate,
                                     afterUpdate,
                                 }: EditDocumentViewProps) {

    async function submitClicked() {
        beforeUpdate()
        TurtleApp.Lock()
        await DocumentsApi.UpdateDocument(doc)
        TurtleApp.Unlock()
        afterUpdate()

    }


    return (
        <Form layout={"vertical"}>

            <StringAttributeView
                entity={doc}
                attribute={"name"}
            />

            <StringAreaAttributeView
                entity={doc}
                attribute={"description"}
            />

            <RightSubmitButton
                onClick={submitClicked}
            />
        </Form>
    )

}