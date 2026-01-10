import {Handle, NodeProps, Position} from "reactflow";

import {OUTPUT_HANDLE_STYLE} from "@TurtleBlueprints/Edit/Styles";

import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";
import NWrapper from "@TurtleBlueprints/Edit/Nodes/NWrapper";
import {NodeIcon} from "@TurtleBlueprints/Edit/VisTools/NodeLabel"
import TurtleApp from "@TurtleApp/TurtleApp"
import BlueprintNodesApi from "@TurtleBlueprints/Api/BlueprintNodesApi"

export default function TriggerHandle(props: NodeProps<NodeParent>) {

    async function call() {
        TurtleApp.Lock()
        await BlueprintNodesApi.PlayNode(props.data)
        TurtleApp.Unlock()
    }

    return (
        <NWrapper
            nodeProps={props}
            nodeStyle={{
                width: 40,
                height: 40,
                borderTopLeftRadius: '30px',
                borderBottomLeftRadius: '30px',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
            }}
        >
            <NodeIcon
                node={props.data}
                onClick={call}
            />

            <Handle
                id={"a"}
                position={Position.Right}
                type="source"
                style={{
                    ...OUTPUT_HANDLE_STYLE,
                    top:"25%"
                }}
            />
        </NWrapper>
    )
}