import {useTranslation} from "react-i18next";
import {Button, Flex, Space, Table, TableProps} from "antd";
import React from "react";

import {HierarchyDeleteButton} from "@Turtle/Components/HierarchyComponents";
import KnowledgeRelation from "@Turtle/KnowledgeHub/Data/KnowledgeRelation";
import {Knowledge} from "@Turtle/KnowledgeHub/Data/Knowledge";
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import COUKhRelation from "@Turtle/KnowledgeHub/KHRelations/COUKhRelation";

interface KnowledgeRelationsViewProps {
    knowledge: Knowledge
}

export default function KnowledgeRelationsView({knowledge}: KnowledgeRelationsViewProps) {
    return (
        <_TableView
            knowledge={knowledge}
        />
    )
}

function _TableView({knowledge}: KnowledgeRelationsViewProps) {

    const [t] = useTranslation()

    const [relations, setRelations] = React.useState<Array<KnowledgeRelation>>([])

    const {activate, deactivate} = useTurtleModal()

    const [isLoading, setIsLoading] = React.useState(true)

    const columns: TableProps<KnowledgeRelation>['columns'] = React.useMemo(() => ([
        {
            title: 'Id',
            key: 'id',
            render: (x, y, index) => {
                return (
                    <div>{index + 1}.</div>
                )
            }
        },
        {
            title: t("name"),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "Uid",
            dataIndex: 'uid',
            key: 'uid',
        },
        {
            title: t("extension"),
            dataIndex: 'extension',
            key: 'extension'
        },
        {
            title: t("actions"),
            dataIndex: 'actions',
            key: 'actions',
            render: (v, item) => {
                return (
                    <Space>

                        <HierarchyDeleteButton
                            onClick={() => {
                                //pass
                            }}/>
                    </Space>
                )
            }
        },
    ]), [])

    async function refresh() {

    }

    function createRelation() {

        const khRelation = new KnowledgeRelation()
        khRelation.a = knowledge.uid

        activate({
            title: t("create.relation"),
            content: (
                <COUKhRelation
                    entity={khRelation}
                    onBeforeUpdate={deactivate}
                    onAfterUpdate={refresh}
                />
            )
        })
    }

    return (
        <Flex vertical>
            <TopBarWrapper>
                <Button
                    onClick={createRelation}
                    type={"text"}
                >
                    {t("create")}
                </Button>
            </TopBarWrapper>
            <Table
                pagination={false}
                rowKey={"uid"}
                bordered
                size={"small"}
                dataSource={relations}
                columns={columns}
            />
        </Flex>
    )
}
