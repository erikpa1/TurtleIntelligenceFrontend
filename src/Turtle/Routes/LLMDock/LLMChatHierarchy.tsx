import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useNavigate} from "react-router-dom";
import {Flex, Tree, TreeDataNode} from "antd";
import {
    HierarchyAddButton,
    HierarchyDeleteButton,
    HierarchyFlex,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents"

import React from "react"


export default function LLMChatHierarchy() {


    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    function createHierarchy(nnModels: Array<any>) {
        return [
            {
                key: "chat",
                title: (
                    <Flex>
                        {t("chat")} ({nnModels.length})
                        <HierarchyRightFlex>
                            <HierarchyAddButton onClick={createChatTopicPressed}/>

                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: nnModels.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex>

                                {val.name}

                                <HierarchyRightFlex>
                                    <HierarchyDeleteButton
                                        onClick={() => {

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


    function createChatTopicPressed() {

    }


    function modelClicked(nnModel: any) {

    }

    function deleteModel(nnModel: string) {

        refresh()
    }

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    async function refresh() {

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