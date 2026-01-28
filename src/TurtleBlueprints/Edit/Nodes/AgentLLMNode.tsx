import {Handle, NodeProps, Position} from "reactflow";

import {INPUT_HANDLE_STYLE, OUTPUT_HANDLE_STYLE, SUBNODE_HANDLE_STYLE} from "@TurtleBlueprints/Edit/Styles";

import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";
import NodeLabel from "@TurtleBlueprints/Edit/VisTools/NodeLabel";
import NWrapper from "@TurtleBlueprints/Edit/Nodes/NWrapper";

import {ListLLMInputHandles} from "@TurtleBlueprints/Edit/Nodes/LLMInputs"
import {FlowInput, FlowOutput} from "@TurtleBlueprints/Data/Nodes/Handles/FlowType";
import {StringInput, StringOutput} from "@TurtleBlueprints/Data/Nodes/Handles/StringType";
import {ErrorOutput} from "@TurtleBlueprints/Data/Nodes/Handles/ErrorType";

export default function AgentLLMNode(props: NodeProps<NodeParent>) {


    return (
        <NWrapper
            nodeProps={props}
        >
            <NodeLabel node={props.data}/>

            <FlowInput
                handleId={"FlowInput"}
            />

            <StringInput
                handleId={"PromptInput"}
                top={"75%"}
            />

            <FlowOutput
                handleId={"FlowOutput"}
            />

            <StringOutput
                handleId={"ResponseOutput"}
                top={"50%"}
            />

            <ErrorOutput
                handleId={"ErrorOutput"}
                top={"75%"}
            />


            {
                ListLLMInputHandles()
            }
        </NWrapper>

    )

}