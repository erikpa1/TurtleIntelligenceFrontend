import {NodeProps} from "reactflow";
import AgentNodeParent, {CanvasStatus} from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";


export function nodeMoveAndModify(node: NodeProps<AgentNodeParent>) {
    const data = node.data

    if (data.canvasStatus === CanvasStatus.NO_CHANGE && node.selected) {
        data.canvasStatus = CanvasStatus.MODIFIED
    }

    data.posX = node.xPos
    data.posY = node.yPos
}