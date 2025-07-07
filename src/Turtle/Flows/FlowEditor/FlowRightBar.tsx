import React from "react"
import {Flex, Tabs, Tree, TreeDataNode} from "antd";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";

import {Flow} from "@Turtle/Flows/Flow";
import {
    HierarchyAddButton, HierarchyDeleteButton,
    HierarchyFlex,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";
import COUFlowView from "@Turtle/Flows/COUFlowView";
import TurtleApp from "@TurtleApp/TurtleApp";

interface FlowRightBarProps {
    flow: Flow
}

export default function FlowRightBar({flow}: FlowRightBarProps) {

    const [t] = useTranslation()

    const {bigPadding} = useTurtleTheme()

    return (
        <div>

            <Tabs
                defaultActiveKey="states"
                centered
                size={"small"}
                items={[
                    {
                        label: t("states"),
                        key: "states",
                    }
                ]}


            />

            <Flex
                vertical
                style={{
                    padding: bigPadding
                }}
            >
                <_StatesHierarchy flow={flow}/>
            </Flex>
        </div>
    )

}


function _StatesHierarchy({flow}: FlowRightBarProps) {
    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()


    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy())

    function createHierarchy(): Array<TreeDataNode> {
        return [
            {
                key: "states",
                title: (
                    <Flex>
                        {t("states")} ({0})

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={createFlowState}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: Array.from(flow.states.entries()).map(([stateName, stateType]) => {
                    return {
                        key: stateName,
                        title: (
                            <HierarchyFlex>

                                {stateName}

                                <HierarchyRightFlex>
                                    <HierarchyDeleteButton onClick={() => {
                                        deleteState(stateName)
                                    }}/>
                                </HierarchyRightFlex>
                            </HierarchyFlex>
                        ),
                    }
                })
            }
        ]
    }


    function createFlowState() {

        const flow = new Flow()

        activate({
            title: t("create.flow.state"),
            closable: true,
            content: (
                <COUFlowView
                    flow={flow}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}

                />
            )
        })
    }

    async function deleteState(flowUid: string) {

        TurtleApp.Lock()
        console.log("Unimplemented")
        TurtleApp.Unlock()
        refresh()

    }

    function refresh() {
        setData(createHierarchy())
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