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
import AIChatApi from "@Turtle/LLM/Api/AIChatApi";
import {ChatHistoryLight} from "@Turtle/LLM/Data/ChatHistory";
import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import TurtleApp from "@TurtleApp/TurtleApp";
import LLMApi from "@Turtle/LLM/Api/LLMApi";
import LLM from "@Turtle/LLM/Data/LLM";


export default function LLMsHierarchy() {


    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    function createHierarchy(clusters: Array<LLM>) {
        return [
            {
                key: "clusters",
                title: (
                    <Flex>
                        {t("clusters")} ({clusters.length})

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={() => {

                                }}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: clusters.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex>

                                {val.name}

                                <HierarchyRightFlex>
                                    <HierarchyDeleteButton
                                        onClick={() => {
                                            deleteCluster(val.uid)
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

    function addLLM() {

    }


    function deleteCluster(clusterUids: string) {

    }


    async function deleteModel(chatUid: string) {
        TurtleApp.Lock()
        await AIChatApi.DeleteChat(chatUid)
        TurtleApp.Unlock()

        refresh()
    }

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    async function refresh() {
        setData(createHierarchy(await LLMApi.ListLLMS()))

    }

    React.useEffect(() => {
        refresh()
    }, [])


    return (
        <AeeWrapper
            aee={aee}
            ChatsChange={refresh}
        >
            <Tree
                key={data[0]?.children?.length}
                blockNode
                virtual
                showLine
                treeData={data}
                defaultExpandAll={true}
            />
        </AeeWrapper>
    )
}