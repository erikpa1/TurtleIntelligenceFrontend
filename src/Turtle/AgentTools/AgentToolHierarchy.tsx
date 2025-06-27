import React from "react"
import {Flex, Tree, TreeDataNode} from "antd"
import AgentTool from "@Turtle/AgentTools/AgentTool"
import {useTranslation} from "react-i18next"
import AgentToolsApi from "@Turtle/AgentTools/AgentToolsApi";

export default function AgentToolsHierarchy({}) {

    const [t] = useTranslation()

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))

    function createHierarchy(tools: Array<AgentTool>):Array<TreeDataNode> {

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
                                {val.name}
                            </Flex>
                        )
                    }
                })
            }
        ]

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