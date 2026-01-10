import React from "react"
import {Flex, Tree, TreeDataNode} from "antd";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {
    HierarchyAddButton, HierarchyCustomIcon,
    HierarchyDeleteButton, HierarchyEditButton,
    HierarchyFlex, HierarchyPlayButton,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";

import {Blueprint} from "@TurtleBlueprints/Data/Blueprint";
import BlueprintsApi from "@TurtleBlueprints/Api/BlueprintsApi";
import TurtleApp from "@TurtleApp/TurtleApp";
import CreateLLMAgentModal from "@TurtleBlueprints/CreateLLMAgentView";
import TestLLMAgentView from "@TurtleBlueprints/TestLLMAgentView";
import {InfoCircleOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import LLMAgentsShop from "@Turtle/LLM/LLMAgentsShop/LLMAgentsShop";

export default function LLMAgentsHierarchy({}) {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    function createHierarchy(agents: Array<Blueprint>) {
        return [
            {
                key: "blueprints",
                title: (
                    <Flex>
                        {t("blueprints")} ({agents.length})
                        <HierarchyRightFlex>
                            <HierarchyAddButton onClick={createAgentPressed}/>


                            <HierarchyCustomIcon
                                icon={<InfoCircleOutlined/>}
                                onClick={showMergedPrompt}/>


                            <HierarchyCustomIcon
                                icon={<ShoppingCartOutlined/>}
                                onClick={showAgentsShopPressed}/>

                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: agents.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex
                                onClick={() => {
                                    agentClicked(val)
                                }}
                            >

                                {val.name}

                                <HierarchyRightFlex>

                                    <HierarchyPlayButton
                                        onClick={() => {
                                            testAgent(val)
                                        }}
                                    />

                                    <HierarchyEditButton
                                        onClick={() => {
                                            editAgent(val)
                                        }}
                                    />

                                    <HierarchyDeleteButton
                                        onClick={() => {
                                            deleteAgentPressed(val.uid)
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

    async function showMergedPrompt() {

        TurtleApp.Lock()
        const prompt = await BlueprintsApi.GetAllAgentsPrompt()
        let lines = prompt.replaceAll("\n", "<br/>");
        activate({
            title: t("merge.prompt"),
            closable: true,
            width: 800,
            content: (
                <div
                    dangerouslySetInnerHTML={{__html: lines}}
                />
            )
        })
        TurtleApp.Unlock()
    }

    function showAgentsShopPressed() {
        activate({
            title: `${t("agents.shop")}:`,
            width: 800,
            closable: true,
            content: (
                <LLMAgentsShop/>
            )
        })
    }

    function agentClicked(agent: Blueprint) {
        navigate(`/blueprints/${agent.uid}`)
    }

    function testAgent(agent: Blueprint) {
        activate({
            title: `${t("test.agent")}:`,
            closable: true,
            content: (
                <TestLLMAgentView agent={agent}/>
            )
        })
    }


    function editAgent(agent: Blueprint) {
        activate({
            title: `${t("edit.agent")}:`,
            closable: true,
            width: 800,
            content: (
                <CreateLLMAgentModal
                    agent={agent}
                    beforeSubmit={deactivate}
                    afterSubmit={refresh}
                />
            )
        })
    }


    function createAgentPressed() {
        const tmp = new Blueprint()

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

    async function deleteAgentPressed(agentUid: string) {
        TurtleApp.Lock()
        await BlueprintsApi.Delete(agentUid)
        TurtleApp.Unlock()
        refresh()
    }

    async function refresh() {
        const agents = await BlueprintsApi.List()
        setData(createHierarchy(agents))

        console.log(agents)
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