import {Flex, Space, Tree, TreeDataNode} from "antd";
import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useNavigate} from "react-router-dom";
import React from "react";
import {Knowledge, KnowledgeType} from "@Turtle/KnowledgeHub/Data/Knowledge";
import {
    HierarchyAddButton, HierarchyDeleteButton,
    HierarchyEditButton,
    HierarchyFlex,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";
import IconDatabaseSearch from "@Turtle/Icons/IconDatabaseSearch";
import COUKnowledgeView from "@Turtle/KnowledgeHub/COUKnowledgeView";
import TurtleApp from "@TurtleApp/TurtleApp";
import KnowledgeApi from "@Turtle/KnowledgeHub/Api/KnowledgeApi";
import KhRelationsApi from "@Turtle/KnowledgeHub/Api/KhRelationsApi";
import KnowledgeRelation from "@Turtle/KnowledgeHub/Data/KnowledgeRelation";


interface KnowledgeRelationsViewProps {
    parentKnowledge: string
}

export default function KnowledgeRelationsView({parentKnowledge}: KnowledgeRelationsViewProps) {
    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    function createHierarchy(relations: Array<KnowledgeRelation>) {
        return [
            {
                key: "knowledge",
                title: (
                    <Flex>
                        {t("relations")} ({relations.length})
                    </Flex>
                ),

                children: relations.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex>

                                <Space>
                                    <IconDatabaseSearch/>
                                    Relation
                                </Space>


                                <HierarchyRightFlex>
                                    <div/>
                                </HierarchyRightFlex>
                            </HierarchyFlex>
                        ),
                    }
                })
            }
        ]
    }

    async function refresh() {

        var relations: KnowledgeRelation[] = []

        if (parentKnowledge) {
            relations = await KhRelationsApi.Query({
                a: {"$oid": parentKnowledge},
            })
        }

        setData(createHierarchy(relations))
    }


    React.useEffect(() => {
        refresh()
    }, [parentKnowledge])

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