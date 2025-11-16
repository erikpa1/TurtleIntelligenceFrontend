import {Flex, Space, Tree, TreeDataNode} from "antd"
import React from "react"
import {useTranslation} from "react-i18next"
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal"
import {useNavigate} from "react-router-dom"

import {
    HierarchyAddButton,
    HierarchyDeleteButton, HierarchyEditButton,
    HierarchyFlex,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents"

import TurtleApp from "@TurtleApp/TurtleApp"

import IconDatabaseSearch from "@Turtle/Icons/IconDatabaseSearch"
import KhDomain from "@Turtle/KnowledgeHub/Data/Domains"
import COUDomainView from "@Turtle/KnowledgeHub/Domains/COUDomain"
import KhDomainApi from "@Turtle/KnowledgeHub/Api/KhDomainApi";

interface DomainsHierarchyProps {
    activeKey?: string
}

export default function DomainsHierarchy({activeKey}: DomainsHierarchyProps) {
    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    function createHierarchy(domains: Array<KhDomain>) {
        return [
            {
                key: "domains",
                title: (
                    <Flex>
                        {t("domains")} ({domains.length})

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={createDocument}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: domains.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex onClick={() => {
                                navigate(`/kh/${val.uid}`)
                            }}>

                                <Space>
                                    <IconDatabaseSearch/>
                                    {val.name}
                                </Space>


                                <HierarchyRightFlex>

                                    <HierarchyEditButton
                                        onClick={() => {
                                            editDomain(val)
                                        }}
                                    />
                                    <HierarchyDeleteButton
                                        onClick={() => {
                                            deleteDomain(val.uid)
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


    function editDomain(domain: KhDomain) {

        activate({
            title: t("edit.domain"),
            closable: true,
            content: (
                <COUDomainView
                    domain={domain}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}

                />
            )
        })
    }

    function createDocument() {

        const domain = new KhDomain()

        activate({
            title: t("create.domain"),
            closable: true,
            content: (
                <COUDomainView
                    domain={domain}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}

                />
            )
        })
    }

    async function deleteDomain(knowledgeUid: string) {

        TurtleApp.Lock()
        await KhDomainApi.Delete(knowledgeUid)
        TurtleApp.Unlock()
        refresh()

    }

    async function refresh() {
        const domains = await KhDomainApi.List()
        setData(createHierarchy(domains))
    }


    React.useEffect(() => {
        refresh()
    }, [])

    return (
        <Tree
            key={data[0]?.children?.length}
            blockNode
            virtual
            activeKey={activeKey}
            showLine
            treeData={data}
            defaultExpandAll={true}
        />
    )
}