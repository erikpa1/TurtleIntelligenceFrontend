import React from "react"
import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useNavigate} from "react-router-dom";
import {Flex, Tree, TreeDataNode} from "antd";
import DocumentsApi from "@Turtle/DocInt/Api/DocumentsApi";
import {FileDocumentLight} from "@Turtle/DocInt/Data/Document";
import {
    HierarchyAddButton,
    HierarchyDeleteButton,
    HierarchyFlex,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";
import CreateDocumentView from "@Turtle/DocInt/Dock/CreateDocumentView";
import {Knowledge} from "@Turtle/KnowledgeHub/Data/Knowledge";

export default function KHierarchy() {
    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()


    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    async function refresh() {
        setData(createHierarchy([]))
    }

    function createHierarchy(documents: Array<Knowledge>) {
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
                                navigate(`/knowledge-hub/${val.uid}`)
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