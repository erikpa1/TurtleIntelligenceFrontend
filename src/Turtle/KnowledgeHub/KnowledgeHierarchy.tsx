import {Flex, Space, Tree, TreeDataNode} from "antd"
import React from "react"
import {useTranslation} from "react-i18next"
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal"
import {useNavigate} from "react-router-dom"

import {
    HierarchyAddButton,
    HierarchyDeleteButton,
    HierarchyEditButton,
    HierarchyFlex,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents"

import {Knowledge, KnowledgeType} from "@Turtle/KnowledgeHub/Data/Knowledge"
import COUKnowledgeView from "@Turtle/KnowledgeHub/COUKnowledgeView";
import TurtleApp from "@TurtleApp/TurtleApp";
import KnowledgeApi from "@Turtle/KnowledgeHub/Api/KnowledgeApi";
import IconDatabaseSearch from "@Turtle/Icons/IconDatabaseSearch";


interface KnowledgeHierarchyProps {
    domain?: string
}

export default function KnowledgeHierarchy({domain}: KnowledgeHierarchyProps) {
    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))


    function createHierarchy(documents: Array<Knowledge>) {
        return [
            {
                key: "knowledge",
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
                                navigate(`/kh/${domain ?? "*"}/${val.uid}/data`)
                            }}>

                                <Space>
                                    <IconDatabaseSearch/>
                                    {val.name}
                                </Space>


                                <HierarchyRightFlex>

                                    <HierarchyEditButton
                                        onClick={() => {
                                            editKnowledge(val)
                                        }}
                                    />
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

    function editKnowledge(kn: Knowledge) {

        if (kn.type === KnowledgeType.PLAIN_TEXT) {
            activate({
                title: t("edit.knowledge"),
                closable: true,
                content: (
                    <COUKnowledgeView
                        knowledge={kn}
                        onBeforeSubmit={deactivate}
                        onAfterSubmit={refresh}

                    />
                )
            })
        } else {
            navigate(`/guidance-edit/${kn.uid}`)
        }
    }

    function createDocument() {
        const knowledge = new Knowledge()

        if (domain) {
            knowledge.domain = domain
        }

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

        var knowledge: Knowledge[] = []

        if (domain) {
            knowledge = await KnowledgeApi.Query({
                domain: {"$oid": domain},
            })
        } else {
            knowledge = await KnowledgeApi.List()
        }

        setData(createHierarchy(knowledge))
    }


    React.useEffect(() => {
        refresh()
    }, [domain])

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