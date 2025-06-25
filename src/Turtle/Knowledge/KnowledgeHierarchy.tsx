import {Flex, Tree, TreeDataNode} from "antd"
import React from "react"
import {useTranslation} from "react-i18next"
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal"
import {useNavigate} from "react-router-dom"

import {
    HierarchyAddButton,
    HierarchyDeleteButton,
    HierarchyFlex,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents"

import CreateDocumentView from "@Turtle/DocInt/Dock/CreateDocumentView"
import {Knowledge} from "@Turtle/Knowledge/Data/Knowledge"
import COUKnowledgeView from "@Turtle/Knowledge/COUKnowledgeView";
import TurtleApp from "@TurtleApp/TurtleApp";
import KnowledgeApi from "@Turtle/Knowledge/Api/KnowledgeApi";

export default function KnowledgeHierarchy() {
    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()


    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))


    function createHierarchy(documents: Array<Knowledge>) {
        return [
            {
                key: "chats",
                title: (
                    <Flex>
                        {t("knowledge")} ({documents.length})

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
                                            deleteKnowledge(val.uid)
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

        const knowledge = new Knowledge()

        activate({
            title: t("create.knowledge"),
            closable: true,
            content: (
                <COUKnowledgeView
                    knowledge={knowledge}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}

                />
            )
        })
    }

    async function deleteKnowledge(knowledgeUid: string) {

        TurtleApp.Lock()
        await KnowledgeApi.Delete(knowledgeUid)
        TurtleApp.Unlock()
        refresh()

    }

    async function refresh() {
        const knowledge = await KnowledgeApi.List()
        setData(createHierarchy(knowledge))
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