import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData";

import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";

import {NodeProps} from "reactflow";
import NWrapper from "@TurtleBlueprints/Edit/Nodes/NWrapper";
import NodeLabel, {NodeIcon} from "@TurtleBlueprints/Edit/VisTools/NodeLabel";
import {FlowInput, FlowOutput} from "@TurtleBlueprints/Data/Nodes/Handles/FlowType";

export default class FlowTestNode extends NodeTypeData {

    static TYPE = "flowTestNode"

    ToJson(): any {

    }

    FromJson(jObj: any) {

    }

}


export function FlowTestNodeHandle(props: NodeProps<NodeParent>) {


    return (
        <NWrapper
            nodeProps={props}

        >
            <NodeLabel
                node={props.data}
            />


            <FlowInput
                handleId={"InputFlow"}
            />

            <FlowOutput
                handleId={"OutputFlow"}
            />


        </NWrapper>
    )
}
