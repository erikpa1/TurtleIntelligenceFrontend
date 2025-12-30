import {Node, NodeProps} from "reactflow";
import AgentNodeParent from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/AgentNodeParent";
import {Tooltip} from "antd";
import {nodeMoveAndModify} from "@Turtle/LLM/LLMAgentsDock/Edit/VisTools/nodeFuncts";
import ColorConstants from "@Turtle/Constants/ColorConstants";
import SelectedNodeMarker from "@Turtle/LLM/LLMAgentsDock/Edit/Utils/SelectedeNodeMarker";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {useTranslation} from "react-i18next";
import React, {MouseEvent as ReactMouseEvent} from "react";
import COUNodeView from "@Turtle/LLM/LLMAgentsDock/Edit/COUNodeView";
import NodesLibrary from "@Turtle/LLM/LLMAgentsDock/Data/NodesLibrary"
import NodesFactory from "@Turtle/LLM/LLMAgentsDock/Data/NodesFactory"

interface NWrapperProps extends React.PropsWithChildren<any> {
    nodeProps: NodeProps<AgentNodeParent>
    nodeStyle?: React.CSSProperties;
}

export default function NWrapper({
                                     children,
                                     nodeProps,
                                     nodeStyle = {}
                                 }: NWrapperProps) {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    function onNodeDoubleClick() {
        activate({
            title: t("edit.node"),
            // icon: React.createElement(NodesFactory.GetIcon(nodeProps.data.type)),
            width: 600,
            content: (
                <>
                    <COUNodeView
                        entity={nodeProps.data}
                        onBeforeUpdate={deactivate}
                        onAfterUpdate={() => {
                            console.log("TODO refresh key hook")
                        }}
                    />

                    <div
                        style={{
                            height: 20
                        }}
                    />
                    <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translate(-50%, 50%)",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        border: `1px solid ${ColorConstants.GRAY}`,
                        padding: 10
                    }}>
                        {
                            React.createElement(NodesFactory.GetIcon(nodeProps.data.type), {
                                width: 50,
                                height: 50,
                            })
                        }
                    </div>
                </>
            ),
        })

    }

    nodeMoveAndModify(nodeProps)

    const markerWidth = nodeStyle.width ? nodeStyle.width : 150
    const markerHeight = nodeStyle.width ? nodeStyle.width : 92 / 2


    const nodeColor = nodeProps.data.color

    return (
        <div
            className="react-flow__node-default"
            style={{
                backgroundColor: nodeColor === ""? "white" : nodeColor,
                borderColor: ColorConstants.GRAY,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...nodeStyle
            }}
            onDoubleClick={onNodeDoubleClick}
        >

            <SelectedNodeMarker
                node={nodeProps.data}
                width={markerWidth as number}
                height={markerHeight as number}
                isActive={nodeProps.selected}
            />

            {children}

        </div>


    )
}