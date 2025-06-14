import React from "react"
import {Flex, Tree, TreeDataNode} from "antd";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {
    HierarchyAddButton,
    HierarchyDeleteButton, HierarchyEditButton,
    HierarchyFlex, HierarchyPlayButton,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";

import {LLMAgent} from "@Turtle/LLM/Data/LLMAgent";
import LLMAgentApi from "@Turtle/LLM/Api/LLMAgentApi";
import TurtleApp from "@TurtleApp/TurtleApp";
import CreateLLMAgentModal from "@Turtle/LLM/LLMAgentsDock/CreateLLMAgentView";
import TestLLMAgentView from "@Turtle/LLM/LLMAgentsDock/TestLLMAgentView";

export default function LLMAgentsHierarchy({}) {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    function createHierarchy(agents: Array<LLMAgent>) {
        return [
            {
                key: "agents",
                title: (
                    <Flex>
                        {t("llm.agents")} ({agents.length})
                        <HierarchyRightFlex>
                            <HierarchyAddButton onClick={createAgentPressed}/>
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

    function agentClicked(agent: LLMAgent) {
        navigate(`/agents/${agent.uid}`)
    }

    function testAgent(agent: LLMAgent) {
        activate({
            title: `${t("test.agent")}:`,
            closable: true,
            content: (
                <TestLLMAgentView agent={agent}/>
            )
        })
    }


    function editAgent(agent: LLMAgent) {
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

    async function deleteAgentPressed(agentUid: string) {
        TurtleApp.Lock()
        await LLMAgentApi.DeleteAgent(agentUid)
        TurtleApp.Unlock()
        refresh()
    }

    async function refresh() {
        const agents = await LLMAgentApi.ListAgents()
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