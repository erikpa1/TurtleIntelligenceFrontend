import ColorConstants from "@Turtle/Constants/ColorConstants";
import {KeyboardKeys, useKeyDownEvent} from "@Turtle/Data/Aee";
import TurtleApp from "@TurtleApp/TurtleApp";
import {useAgentNodesZus} from "@TurtleBlueprints/Edit/agentNodeZus";
import AgentNodeParent from "@TurtleBlueprints/Data/Nodes/AgentNodeParent";

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

        const PADDING_SIZE = 15
        const CORNER_LENGTH = 10

        return (
            <>
                <div
                    style={{
                        position: 'absolute',
                        top: -PADDING_SIZE / 2,
                        left: -PADDING_SIZE / 2,
                        width: width + PADDING_SIZE,
                        height: height + PADDING_SIZE,
                        pointerEvents: 'none',
                    }}
                >
                    {/* Top-left corner */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: CORNER_LENGTH,
                        height: 2,
                        backgroundColor: ColorConstants.AZURE_BLUE,
                    }}/>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 2,
                        height: CORNER_LENGTH,
                        backgroundColor: ColorConstants.AZURE_BLUE,
                    }}/>

                    {/* Top-right corner */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: CORNER_LENGTH,
                        height: 2,
                        backgroundColor: ColorConstants.AZURE_BLUE,
                    }}/>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 2,
                        height: CORNER_LENGTH,
                        backgroundColor: ColorConstants.AZURE_BLUE,
                    }}/>

                    {/* Bottom-left corner */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: CORNER_LENGTH,
                        height: 2,
                        backgroundColor: ColorConstants.AZURE_BLUE,
                    }}/>
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 2,
                        height: CORNER_LENGTH,
                        backgroundColor: ColorConstants.AZURE_BLUE,
                    }}/>

                    {/* Bottom-right corner */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: CORNER_LENGTH,
                        height: 2,
                        backgroundColor: ColorConstants.AZURE_BLUE,
                    }}/>
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 2,
                        height: CORNER_LENGTH,
                        backgroundColor: ColorConstants.AZURE_BLUE,
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
        // TurtleApp.Lock()
        // console.log("Delete pressed")
        // useAgentNodesZus.getState().deleteNode(node)
        //
        // TurtleApp.Unlock()
    }

    const _ = useKeyDownEvent(KeyboardKeys.DEL, deletePressed)

    return (<></>)
}