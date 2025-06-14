import React from "react"
import {Flex, Tree, TreeDataNode} from "antd";
import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useNavigate} from "react-router-dom";
import AIChatApi from "@Turtle/LLM/Api/AIChatApi";
import {ChatHistoryLight} from "@Turtle/LLM/Data/LLMChatHistory";
import {
    HierarchyAddButton,
    HierarchyDeleteButton,
    HierarchyFlex,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";
import DocumentsApi from "@Turtle/DocInt/Api/DocumentsApi";
import {FileDocumentLight} from "@Turtle/DocInt/Data/Document";
import CreateDocumentView from "@Turtle/DocInt/Dock/CreateDocumentView";

export default function DocIntHierarchy({}) {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()


    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    async function refresh() {
        setData(createHierarchy(await DocumentsApi.ListDocuments()))
    }

    function createHierarchy(documents: Array<FileDocumentLight>) {
        return [
            {
                key: "chats",
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
                                navigate(`/doc-int/${val.uid}`)
                            }}>

                                {val.name}

                                <HierarchyRightFlex>

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
                <CreateDocumentView/>
            )
        })
    }

    function deleteDocument(documentUid: string) {

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