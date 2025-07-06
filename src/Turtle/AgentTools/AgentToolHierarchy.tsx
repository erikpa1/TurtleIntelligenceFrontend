import React from "react"
import {Flex, Tree, TreeDataNode} from "antd"
import AgentTool from "@Turtle/AgentTools/AgentTool"
import {useTranslation} from "react-i18next"
import AgentToolsApi from "@Turtle/AgentTools/AgentToolsApi"
import {useNavigate} from "react-router-dom"
import {HierarchyCustomIcon, HierarchyRightFlex, HierarchyViewButton} from "@Turtle/Components/HierarchyComponents";
import AgentToolView from "@Turtle/AgentTools/AgentToolView";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";

export default function AgentToolsHierarchy({}) {

    const [t] = useTranslation()

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    function createHierarchy(tools: Array<AgentTool>): Array<TreeDataNode> {

        return [
            {
                key: "documents",
                title: (
                    <Flex>
                        {t("tools")} ({tools.length})
                    </Flex>
                ),
                children: tools.map((val) => {

                    return {
                        key: val.uid,
                        title: (
                            <Flex>

                                <HierarchyCustomIcon icon={`/icons/${val.icon}`}/>

                                {val.name}


                                <HierarchyRightFlex>
                                    <HierarchyViewButton
                                        onClick={() => {
                                            viewToolPressed(val)
                                        }}
                                    />
                                </HierarchyRightFlex>
                            </Flex>
                        )
                    }
                })
            }
        ]

    }

    function viewToolPressed(tool: AgentTool) {
        activate({
            title: tool.name,
            closable: true,
            content: (<AgentToolView agent={tool}/>)
        })
    }

    async function refresh() {
        const installedTools = await AgentToolsApi.ListInstalledTools()
        setData(createHierarchy(installedTools))
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