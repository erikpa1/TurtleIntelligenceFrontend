import React from "react"

import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useNavigate} from "react-router-dom";
import {Flex, Space, Tree, TreeDataNode} from "antd";
import {
    HierarchyAddButton,
    HierarchyDeleteButton,
    HierarchyFlex,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents"
import LLMApi from "@Turtle/LLM/Api/LLMApi"
import {bodkaBodkaText} from "@Turtle/Utils/StringFormatters"
import TurtleApp from "@TurtleApp/TurtleApp"
import CreateLLMClusterModal from "@Turtle/LLM/LLMCluster/CreateLLMClusterModal";
import LLMCluster from "@Turtle/LLM/Data/LLMCluster";
import ColorConstants from "@Turtle/Constants/ColorConstants";


export default function LLMClusterHierarchy() {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    function createHierarchy(clusters: Array<LLMCluster>) {
        return [
            {
                key: "llmclusters",
                title: (
                    <Flex>
                        {t("llm.clusters")} ({clusters.length})
                        <HierarchyRightFlex>
                            <HierarchyAddButton onClick={createClusterPressed}/>
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: clusters.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex
                                onClick={() => {
                                    clusterClicked(val)
                                }}
                            >

                                <Space>
                                    <_ClusterHealthCheck clusterUid={val.uid}/>

                                    <div>
                                        {val.name} [{bodkaBodkaText(val.url, 15)}]
                                    </div>
                                </Space>

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

    function clusterClicked(cluster: LLMCluster) {
        navigate(`/llm-clusters/${cluster.uid}`)
    }

    function createClusterPressed() {
        const tmp = new LLMCluster()

        activate({
            title: t("create.llmcluster"),
            closable: true,
            content: (
                <CreateLLMClusterModal
                    cluster={tmp}
                    beforeSubmit={deactivate}
                    afterSubmit={refresh}
                />
            )
        })
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

function _ClusterHealthCheck({clusterUid}) {


    return (
        <div
            style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: ColorConstants.GREEN,
                border: "solid 1px grey",
            }}
        />
    )
}