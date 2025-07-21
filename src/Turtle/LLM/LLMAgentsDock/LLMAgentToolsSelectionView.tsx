import {Flex, Tree, TreeDataNode} from "antd";
import {useTranslation} from "react-i18next";
import React from "react";
import Search from "antd/es/input/Search";
import ToolCard from "@Turtle/AgentTools/ToolCard";
import AgentTool from "@Turtle/AgentTools/AgentTool";
import AgentToolsApi from "@Turtle/AgentTools/AgentToolsApi";
import {useQuery} from "react-query";
import {CenterSpinner} from "@Turtle/Components/Loadings";
import {create} from "zustand";
import {
    HierarchyCustomIcon,
    HierarchyInfoButton,
    HierarchyRightFlex,
    HierarchyViewButton
} from "@Turtle/Components/HierarchyComponents";
import {LLMAgent} from "@Turtle/LLM/Data/LLMAgent";


interface LLMAgentToolsSelectionViewProps {
    agent: LLMAgent
}

const TOOL_HIERARCHY_KEY = "tools"

export default function LLMAgentToolsSelectionView({agent}: LLMAgentToolsSelectionViewProps) {


    const [t] = useTranslation()

    const {isFetching, data, error} = useQuery({
        queryKey: ['agentTools'],
        queryFn: AgentToolsApi.ListAllAvailableTools
    })

    const [searchText, setSearchText] = React.useState("")

    function createTree(tools: Array<AgentTool>): Array<TreeDataNode> {


        return [
            {
                key: "tools",
                title: t("tools"),
                children: tools.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <Flex>

                                <HierarchyCustomIcon icon={`/icons/${val.icon}`}/>

                                {val.name}

                                <HierarchyRightFlex>
                                    <HierarchyInfoButton onClick={() => {
                                        //pass
                                    }}/>
                                </HierarchyRightFlex>
                            </Flex>
                        )
                    }
                })
            }
        ]


    }


    function searchTyping(text: string) {
        setSearchText(text)
    }

    function onCheck(element: Array<string>) {
        const tmp = new Set(element)
        tmp.delete(TOOL_HIERARCHY_KEY)
        agent.tools = tmp
    }

    if (isFetching) {
        return (
            <CenterSpinner/>
        )
    } else {

        return (
            <Flex
                vertical
                gap={15}

            >

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Search
                        defaultValue={searchText}
                        onChange={(e) => {
                            searchTyping(e.target.value)
                        }}
                        variant="borderless"
                        style={{
                            width: '200px',
                            flex: 'none',
                            borderBottom: '1px solid #d9d9d9',
                            borderRadius: 0
                        }}
                    />
                </div>


                <Tree
                    key={data ? data.length : "0"}
                    blockNode
                    virtual
                    showLine
                    treeData={createTree((data ?? []))}
                    defaultExpandAll={true}
                    defaultCheckedKeys={Array.from(agent.tools.values())}
                    checkable
                    onCheck={onCheck as any}
                />

            </Flex>
        )
    }

}