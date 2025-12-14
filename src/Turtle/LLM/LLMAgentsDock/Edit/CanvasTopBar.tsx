import {HierarchyRightFlex} from "@Turtle/Components/HierarchyComponents";
import {SaveButton} from "@Turtle/Components/SaveButton";
import AgentNodesApi from "@Turtle/LLM/LLMAgentsDock/Api/AgentNodesApi";
import TurtleApp from "@TurtleApp/TurtleApp";
import {useAgentNodesZus} from "@Turtle/LLM/LLMAgentsDock/Edit/agentNodeZus";
import {CanvasStatus} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {Button, Flex, Space} from "antd";
import {NodeConnStatus} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodeConnections";


export default function CanvasTopBar() {
    return (
        <>
            <_Statistics/>

            <HierarchyRightFlex>
                <_PlayButton/>
                <_Save/>
            </HierarchyRightFlex>
        </>
    )
}

function _Statistics({}) {

    const {nodes, deletedNodes} = useAgentNodesZus()

    return (
        <Flex vertical>
            <Space>
                Nodes: {nodes.length}
                Deleted: {deletedNodes.size}
            </Space>

        </Flex>
    )
}

function _Save({}) {


    async function savePressed() {
        TurtleApp.Lock()

        const canvasState = useAgentNodesZus.getState()
        await AgentNodesApi.SavePressed(
            canvasState.nodes,
            Array.from(canvasState.deletedNodes.values()),
            canvasState.edges
        )

        canvasState.nodes.forEach((val) => {
            val.canvasStatus = CanvasStatus.NO_CHANGE
        })

        canvasState.deletedNodes.clear()

        canvasState.edges.forEach((val) => {
            val._status = NodeConnStatus.NOT_MODIFIED
        })

        TurtleApp.Unlock()


    }

    return (
        <SaveButton onClick={savePressed}/>
    )
}

function _PlayButton({}) {
    return (
        <Button type={"text"}>
            Play
        </Button>
    )
}