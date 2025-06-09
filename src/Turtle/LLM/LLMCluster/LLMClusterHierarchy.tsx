import React from "react"

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
import LLMApi from "@Turtle/LLM/Api/LLMApi"
import {bodkaBodkaText} from "@Turtle/Utils/StringFormatters"
import TurtleApp from "@TurtleApp/TurtleApp"
import CreateLLMAgentModal from "@Turtle/LLM/LLMAgentsDock/CreateLLMAgentView";
import {LLMAgent} from "@Turtle/LLM/Data/LLMAgent"


export default function LLMClusterHierarchy() {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    function createHierarchy(nnModels: Array<any>) {
        return [
            {
                key: "llmclusters",
                title: (
                    <Flex>
                        {t("llm.clusters")} ({nnModels.length})
                        <HierarchyRightFlex>
                            <HierarchyAddButton onClick={createClusterPressed}/>
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: nnModels.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex onClick={modelClicked}>

                                {val.name} [{bodkaBodkaText(val.url, 15)}]

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

    function createClusterPressed() {
        const tmp = new LLMAgent()

        activate({
            title: t("create.llmagent"),
            width: 800,
            closable: true,
            content: (
                <CreateLLMAgentModal
                    agent={tmp}
                    beforeSubmit={deactivate}
                    afterSubmit={refresh}
                />
            )
        })
    }


    function modelClicked(nnModel: any) {

    }

    async function deleteCluster(clusterUid: string) {
        TurtleApp.Lock()
        await LLMApi.DeleteCluster(clusterUid)
        TurtleApp.Unlock()
        refresh()
    }

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    async function refresh() {
        const clusters = await LLMApi.ListClusters()
        setData(createHierarchy(clusters))
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