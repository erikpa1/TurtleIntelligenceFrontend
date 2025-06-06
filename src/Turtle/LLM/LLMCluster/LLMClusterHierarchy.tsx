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
import Model from "@TurtleApp/Data/Model"
import EntityForm from "@Turtle/Components/Forms/EntityForm"
import ModelProperties from "@TurtleApp/Data/Model_Properties"
import ModelsApi from "@TurtleApp/Api/ModelsApi"
import LLMCluster from "@Turtle/LLM/Data/LLMCluster";
import CreateLLMClusterModal from "@Turtle/LLM/LLMCluster/CreateLLMClusterModal";
import LLMApi from "@Turtle/LLM/Api/LLMApi";
import {bodkaBodkaText} from "@Turtle/Utils/StringFormatters";
import * as cluster from "cluster";
import TurtleApp from "@TurtleApp/TurtleApp";


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
        const tmp = new LLMCluster()

        activate({
            title: t("create.llmcluster"),
            content: (
                <CreateLLMClusterModal
                    cluster={tmp}
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