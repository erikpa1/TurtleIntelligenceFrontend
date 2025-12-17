import ColorConstants from "@Turtle/Constants/ColorConstants";
import {KeyboardKeys, useKeyDownEvent} from "@Turtle/Data/Aee";
import TurtleApp from "@TurtleApp/TurtleApp";
import {useAgentNodesZus} from "@Turtle/LLM/LLMAgentsDock/Edit/agentNodeZus";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";

interface SelectedNodeMarkerProps {
    node: AgentNodeParent
    isActive: boolean
    width: number
    height: number
}


export default function SelectedNodeMarker(
    {
        node,
        isActive,
        width,
        height
    }: SelectedNodeMarkerProps) {

    if (isActive) {

        const CIRCLE_SIZE = 5
        const PADDING_SIZE = 10

        return (
            <>
                <div
                    style={{
                        position: 'absolute',
                        top: -PADDING_SIZE / 2,
                        left: -PADDING_SIZE / 2,
                        width: width + PADDING_SIZE,
                        height: height + PADDING_SIZE,
                        border: `1px dashed ${ColorConstants.AZURE_BLUE}`,
                        borderRadius: '1px',
                        pointerEvents: 'none',
                        animation: 'dashAnimation 20s linear infinite',
                        boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.1)',
                    }}
                >
                    <style>
                        {`
                    @keyframes dashAnimation {
                        to {
                            stroke-dashoffset: -100;
                        }
                    }
                `}
                    </style>

                    {/* Corner indicators */}
                    <div style={{
                        position: 'absolute',
                        top: -CIRCLE_SIZE / 2,
                        left: -CIRCLE_SIZE / 2,
                        width: CIRCLE_SIZE,
                        height: CIRCLE_SIZE,
                        backgroundColor: ColorConstants.AZURE_BLUE,
                        borderRadius: '50%',
                        boxShadow: '0 0 4px rgba(59, 130, 246, 0.5)'
                    }}/>
                    <div style={{
                        position: 'absolute',
                        top: -CIRCLE_SIZE / 2,
                        right: -CIRCLE_SIZE / 2,
                        width: CIRCLE_SIZE,
                        height: CIRCLE_SIZE,
                        backgroundColor: ColorConstants.AZURE_BLUE,
                        borderRadius: '50%',
                        boxShadow: '0 0 4px rgba(59, 130, 246, 0.5)'
                    }}/>
                    <div style={{
                        position: 'absolute',
                        bottom: -CIRCLE_SIZE / 2,
                        left: -CIRCLE_SIZE / 2,
                        width: CIRCLE_SIZE,
                        height: CIRCLE_SIZE,
                        backgroundColor: ColorConstants.AZURE_BLUE,
                        borderRadius: '50%',
                        boxShadow: '0 0 4px rgba(59, 130, 246, 0.5)'
                    }}/>
                    <div style={{
                        position: 'absolute',
                        bottom: -CIRCLE_SIZE / 2,
                        right: -CIRCLE_SIZE / 2,
                        width: CIRCLE_SIZE,
                        height: CIRCLE_SIZE,
                        backgroundColor: ColorConstants.AZURE_BLUE,
                        borderRadius: '50%',
                        boxShadow: '0 0 4px rgba(59, 130, 246, 0.5)'
                    }}/>
                </div>
                <_ShortcutListener node={node}/>
            </>
        );
    } else {
        return <></>
    }
}


function _ShortcutListener({node}) {

    function deletePressed() {
        TurtleApp.Lock()
        useAgentNodesZus.getState().deleteNode(node)

        TurtleApp.Unlock()
    }

    const _ = useKeyDownEvent(KeyboardKeys.DEL, deletePressed)

    return (<></>)
}