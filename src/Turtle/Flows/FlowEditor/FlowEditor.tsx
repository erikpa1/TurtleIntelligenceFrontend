import React from "react"

import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import {useActiveFlowEditor} from "@Turtle/Flows/flowEditorZus";
import {Flex, Space, Table, TableProps} from "antd";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import {Flow, FlowStage} from "@Turtle/Flows/Flow";
import {useTranslation} from "react-i18next";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import COUFlowStageView from "@Turtle/Flows/FlowEditor/COUFlowStageView";
import {
    HierarchyDeleteButton,
    HierarchyDownButton,
    HierarchyEditButton,
    HierarchyUpButton
} from "@Turtle/Components/HierarchyComponents";

const initialNodes = [
    {id: '1', position: {x: 0, y: 0}, data: {label: '1'}},
    {id: '2', position: {x: 0, y: 100}, data: {label: '2'}},
];

const initialEdges = [{id: 'e1-2', source: '1', target: '2'}];


export default function FlowEditor({flow}) {

    const {viewType} = useActiveFlowEditor()

    if (viewType === 0) {
        return (
            <_NodesFlowEditor flow={flow}/>
        )
    } else if (viewType === 1) {
        return (
            <_TableFlowEditor flow={flow}/>
        )
    } else {
        return (
            <div>Undefined view</div>
        )
    }


}

function _NodesFlowEditor({flow}) {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = React.useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
        >
            <MiniMap/>
            <Controls/>
            <Background/>
        </ReactFlow>
    );
}

interface _TableFlowEditorProps {
    flow: Flow
}

function _TableFlowEditor({flow}: _TableFlowEditorProps) {

    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const {bigPadding} = useTurtleTheme()

    const [stages, setStages] = React.useState<FlowStage[]>(flow.stages)

    function addStage(flowStage: FlowStage) {
        flow.stages.push(flowStage)
        setStages([...flow.stages])
    }


    function showCreateStagePopup() {

        const flowStage = new FlowStage()
        flowStage.uid = crypto.randomUUID() //TODO toto na macu nepojde

        activate({
            title: "create.flow.stage",
            closable: true,
            content: (
                <COUFlowStageView
                    flowStage={flowStage}
                    onSubmit={() => {
                        deactivate()
                        addStage(flowStage)
                    }}
                />
            )
        })
    }

    function moveUp() {
        //pass
    }

    function moveDown() {
        //pass
    }

    function editItem() {
        //pass
    }

    function deleteItem() {
        //pass
    }


    const columns: TableProps<FlowStage>['columns'] = React.useMemo(() => ([
        {
            title: 'Id',
            key: 'id',
            render: (x, y, index) => {
                return (
                    <div>{index + 1}.</div>
                )
            }
        },
        {
            title: t("name"),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t("type"),
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: t("actions"),
            dataIndex: 'actions',
            key: 'actions',
            render: (y) => {
                return (
                    <Space>
                        <HierarchyDownButton onClick={moveDown}/>
                        <HierarchyUpButton onClick={moveUp}/>
                        <HierarchyEditButton onClick={editItem}/>
                        <HierarchyDeleteButton onClick={deleteItem}/>
                    </Space>
                )
            }
        },
    ]), [])

    return (
        <Flex
            vertical
            gap={15}
            style={{
                padding: bigPadding
            }}
        >
            <Table
                pagination={false}
                rowKey={"uid"}
                bordered
                size={"small"}
                dataSource={stages}
                columns={columns}
                style={{
                    border: "2px solid rgb(230, 230, 230)",
                }}
            />

            <RightSubmitButton
                onClick={showCreateStagePopup}
                label={"add.stage"}
            />
        </Flex>
    )
}

