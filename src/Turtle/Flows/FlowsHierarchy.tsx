import React from "react"
import {useTranslation} from "react-i18next"
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal"
import {useNavigate} from "react-router-dom"
import {Flex, Tree, TreeDataNode} from "antd"
import {Knowledge, KnowledgeType} from "@Turtle/Knowledge/Data/Knowledge"
import {
    HierarchyAddButton, HierarchyDeleteButton,
    HierarchyEditButton,
    HierarchyFlex,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents"

import TurtleApp from "@TurtleApp/TurtleApp"
import {Flow, FlowLight} from "@Turtle/Flows/Flow";
import FlowsApi from "@Turtle/Flows/FlowsApi";
import COUFlowView from "@Turtle/Flows/COUFlowView";

export default function FlowsHierarchy() {
    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const navigate = useNavigate()

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy([]))


    function createHierarchy(flows: Array<FlowLight>) {
        return [
            {
                key: "flows",
                title: (
                    <Flex>
                        {t("flows")} ({flows.length})

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={createFlow}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: flows.map((val) => {
                    return {
                        key: val.uid,
                        title: (
                            <HierarchyFlex onClick={() => {
                                navigate(`/flows/${val.uid}`)
                            }}>

                                {val.name}

                                <HierarchyRightFlex>
                                    <HierarchyEditButton
                                        onClick={() => {
                                            editFlow(val)
                                        }}
                                    />
                                    <HierarchyDeleteButton
                                        onClick={() => {
                                            deleteFlow(val.uid)
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


    function editFlow(flow: FlowLight) {

        activate({
            title: t("edit.flow"),
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

    function createFlow() {

        const flow = new Flow()

        activate({
            title: t("create.flow"),
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

    async function deleteFlow(flowUid: string) {

        TurtleApp.Lock()
        await FlowsApi.Delete(flowUid)
        TurtleApp.Unlock()
        refresh()

    }

    async function refresh() {
        const knowledge = await FlowsApi.List()
        setData(createHierarchy(knowledge))
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
