import React from "react"
import {Flex, Tree, TreeDataNode} from "antd"
import AgentTool from "@Turtle/AgentTools/AgentTool"
import {useTranslation} from "react-i18next"
import AgentToolsApi from "@Turtle/AgentTools/AgentToolsApi"
import {useNavigate} from "react-router-dom"
import {
    HierarchyAddButton,
    HierarchyCustomIcon,
    HierarchyRightFlex,
    HierarchyViewButton
} from "@Turtle/Components/HierarchyComponents";
import AgentToolView from "@Turtle/AgentTools/AgentToolView";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";

export default function AgentToolsHierarchy({}) {

    const [t] = useTranslation()

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    const filter = "category"

    function createHierarchy(tools: Array<AgentTool>): Array<TreeDataNode> {

        const filterMap = new Map<string, Array<AgentTool>>()

        tools.forEach((val) => {
            const existingArray = filterMap.get(val[filter])

            if (existingArray) {
                existingArray.push(val)
            } else {
                filterMap.set(val[filter], [val])
            }
        })

        return [
            {
                key: "tools",
                title: (
                    <Flex>
                        {t("tools")} ({tools.length})

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={createTool}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),
                children: Object.entries(filterMap).map(([filterName, filterValues]) => {
                    return [
                        {
                            key: filterName,
                            title: filterName,
                            children: filterValues.map((tool) => {
                                return {
                                    key: tool.uid,
                                    title: (
                                        <Flex>
                                            <HierarchyCustomIcon icon={`/icons/${tool.icon}`}/>
                                            {tool.name}
                                            <HierarchyRightFlex>
                                                <HierarchyViewButton
                                                    onClick={() => {
                                                        viewToolPressed(tool)
                                                    }}
                                                />
                                            </HierarchyRightFlex>
                                        </Flex>
                                    )
                                }
                            })
                        }
                    ] as any
                })
            }
        ]

    }

    function createTool() {
        activate({
            title: t("create.tools"),
            closable: true,
            content: (
                <div>

                </div>
            )
        })
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