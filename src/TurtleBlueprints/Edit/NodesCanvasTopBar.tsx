import {HierarchyRightFlex} from "@Turtle/Components/HierarchyComponents";
import {SaveButton} from "@Turtle/Components/SaveButton";
import BlueprintNodesApi from "@TurtleBlueprints/Api/BlueprintNodesApi";
import TurtleApp from "@TurtleApp/TurtleApp";
import {useAgentExecZus, useAgentNodesZus} from "@TurtleBlueprints/Edit/agentNodeZus";
import {CanvasStatus} from "@TurtleBlueprints/Data/Nodes/NodeParent";
import {Button, Flex, Space} from "antd";
import {NodeConnStatus} from "@TurtleBlueprints/Data/Nodes/NodeConnections";
import {useTranslation} from "react-i18next";
import NodesLibrary from "@TurtleBlueprints/Data/NodesLibrary"


export default function NodesCanvasTopBar() {
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
        <Flex vertical justify={"center"}>
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

        await BlueprintNodesApi.SavePressed(
            canvasState.nodes,
            Array.from(canvasState.deletedNodes.values()),
            canvasState.edges,
            canvasState.deletedEdges
        )


        canvasState.nodes.forEach((val) => {
            val.canvasStatus = CanvasStatus.NO_CHANGE
        })

        canvasState.deletedNodes.clear()

        canvasState.edges.forEach((val) => {
            val._status = NodeConnStatus.NOT_MODIFIED
        })

        canvasState.saveClear()


        TurtleApp.Unlock()


    }

    return (
        <SaveButton onClick={savePressed}/>
    )
}

function _PlayButton({}) {

    const [t] = useTranslation()

    const {nodes} = useAgentNodesZus()

    async function playPressed() {

        TurtleApp.Lock()

        for (const node of useAgentNodesZus.getState().nodes) {
            if (node.type === NodesLibrary.httpTrigger) {
                const data = await BlueprintNodesApi.PlayNode(node)
                console.log(data)
                useAgentExecZus.getState().setPipeline(data)
                break
            }
        }

        TurtleApp.Unlock()
    }

    const disabled = nodes.filter((val) => val.type === NodesLibrary.httpTrigger).length === 0

    return (
        <Button
            type={"text"}
            onClick={playPressed}
            disabled={disabled}
        >
            Play
        </Button>
    )
}