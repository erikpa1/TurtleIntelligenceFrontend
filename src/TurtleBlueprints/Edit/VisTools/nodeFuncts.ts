import {NodeProps} from "reactflow";
import NodeParent, {CanvasStatus} from "@TurtleBlueprints/Data/Nodes/NodeParent";


export function nodeMoveAndModify(node: NodeProps<NodeParent>) {
    const data = node.data

    if (data.canvasStatus === CanvasStatus.NO_CHANGE && node.selected) {
        data.canvasStatus = CanvasStatus.MODIFIED
    }

    data.posX = node.xPos
    data.posY = node.yPos
}