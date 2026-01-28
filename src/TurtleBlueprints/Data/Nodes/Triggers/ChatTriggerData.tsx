import NodeTypeData from "@TurtleBlueprints/Data/Nodes/NodeTypeData";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";

import {LoadFileStringData} from "@TurtleBlueprints/Data/Nodes/Filesystem/LoadFileStringData";
import NodeParent from "@TurtleBlueprints/Data/Nodes/NodeParent";
import {StringAreaAttributeView} from "@Turtle/Components/Forms/StringAreaPropertyView";
import {Handle, NodeProps, Position} from "reactflow";
import TurtleApp from "@TurtleApp/TurtleApp";
import BlueprintNodesApi from "@TurtleBlueprints/Api/BlueprintNodesApi";
import NWrapper from "@TurtleBlueprints/Edit/Nodes/NWrapper";
import {NodeIcon} from "@TurtleBlueprints/Edit/VisTools/NodeLabel";
import {OUTPUT_HANDLE_STYLE} from "@TurtleBlueprints/Edit/Styles";
import {FlowOutput} from "@TurtleBlueprints/Data/Nodes/Handles/FlowType";
import {StringOutput} from "@TurtleBlueprints/Data/Nodes/Handles/StringType";

export default class ChatTriggerData extends NodeTypeData {

    triggerDescription = ""
    examplePrompt = ""

    ToJson(): any {
        return {
            triggerDescription: this.triggerDescription,
            examplePrompt: this.examplePrompt,
        }
    }

    FromJson(jObj: any) {
        this.triggerDescription = jObj.triggerDescription ?? this.triggerDescription
        this.examplePrompt = jObj.examplePrompt ?? this.examplePrompt
    }

}


interface COULChatTriggerDataViewProps {
    node: NodeParent
}


export function COULChatTriggerDataView({
                                            node,

                                        }: COULChatTriggerDataViewProps) {

    const data: LoadFileStringData = node.typeData as any

    return (
        <>
            <StringAttributeView
                entity={data}
                attribute={"triggerDescription"}
            />

            <StringAreaAttributeView
                entity={data}
                attribute={"examplePrompt"}
            />
        </>
    )
}

export function ChatInputNodeHandle(props: NodeProps<NodeParent>) {

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


            <FlowOutput
                handleId={"ChatTriggered"}
            />


            <StringOutput
                handleId={"PromptText"}
                top={"75%"}
            />


        </NWrapper>
    )
}
