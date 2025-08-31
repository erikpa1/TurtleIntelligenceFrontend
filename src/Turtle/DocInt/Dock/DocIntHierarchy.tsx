import React from "react"
import {Flex, Tree, TreeDataNode} from "antd";
import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useNavigate} from "react-router-dom";
import AIChatApi from "@Turtle/LLM/Api/AIChatApi";
import {ChatHistoryLight} from "@Turtle/LLM/Data/LLMChatHistory";
import {
    HierarchyAddButton, HierarchyChatButton,
    HierarchyDeleteButton, HierarchyEditButton,
    HierarchyFlex,
    HierarchyRightFlex, HierarchyViewButton
} from "@Turtle/Components/HierarchyComponents";
import DocumentsApi from "@Turtle/DocInt/Api/DocumentsApi";
import {FileDocument} from "@Turtle/DocInt/Data/Document";
import CreateDocumentView, {EditDocumentView} from "@Turtle/DocInt/Dock/CreateDocumentView";
import {FileDropExample1} from "@Turtle/Examples/FileDropExample";
import TurtleApp from "@TurtleApp/TurtleApp";
import AskInDocumentView from "@Turtle/DocInt/Components/AskInDocumentView";


export function DocIntHierarchy({}) {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))


    function createHierarchy(documents: Array<FileDocument>) {
        return [
            {
                key: "documents",
                title: (
                    <Flex>
                        {t("documents")} ({documents.length})

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={createDocument}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: documents.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex onClick={() => {
                                navigate(val.GetDocIntPath())
                            }}>

                                {val.name}

                                <HierarchyRightFlex>

                                    <HierarchyEditButton
                                        onClick={() => {
                                            editDocument(val)
                                        }}
                                    />

                                    <HierarchyChatButton
                                        onClick={() => {
                                            askInDocument(val)
                                        }}
                                    />

                                    <HierarchyDeleteButton
                                        onClick={() => {
                                            deleteDocument(val.uid)
                                        }}
                                    />
                                </HierarchyRightFlex>
                            </HierarchyFlex>
                        ),
                    }
                })
            }
        ]
    }

    function createDocument() {
        activate({
            title: t("create.document"),
            closable: true,
            content: (
                <CreateDocumentView
                    beforeUpdate={deactivate}
                    afterUpdate={refresh}
                />
            )
        })
    }

    function editDocument(doc: FileDocument) {
        activate({
            title: t("edit.document"),
            closable: true,
            content: (
                <EditDocumentView
                    doc={doc}
                    beforeUpdate={deactivate}
                    afterUpdate={refresh}
                />
            )
        })
    }

    function askInDocument(doc: FileDocument) {
        activate({
            title: t("ask.in.document"),
            closable: true,
            content: (
                <AskInDocumentView
                    doc={doc}
                />
            )
        })
    }


    async function deleteDocument(documentUid: string) {
        TurtleApp.Lock()
        await DocumentsApi.Delete(documentUid)
        TurtleApp.Unlock()
        refresh()
    }

    async function refresh() {
        setData(createHierarchy(await DocumentsApi.ListDocuments()))
    }

    React.useEffect(() => {
        refresh()
    }, [])


    return (
        <Tree
            key={data[0]?.children?.length}
            blockNode
            virtual
            showLine
            treeData={data}
            defaultExpandAll={true}
        />
    )
}