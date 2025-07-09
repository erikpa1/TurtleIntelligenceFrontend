import React from "react"
import {ColorPicker, Flex, Form, Select, Space, Tabs, Tree, TreeDataNode} from "antd";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import {useTranslation} from "react-i18next";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";

import {Flow, FlowTypes} from "@Turtle/Flows/Flow";
import {
    HierarchyAddButton, HierarchyDeleteButton,
    HierarchyFlex,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";
import COUFlowView from "@Turtle/Flows/COUFlowView";
import TurtleApp from "@TurtleApp/TurtleApp";
import StringAttributeView from "@Turtle/Components/Forms/StringAttributeView";
import SelectItem, {SelectItemRaw} from "@Turtle/ReflectiveUI/SelectItem";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import IconColor from "@Turtle/Icons/IconColor";
import ColorConstants from "@Turtle/Constants/ColorConstants";

interface FlowRightBarProps {
    flow: Flow
}

export default function FlowRightBar({flow}: FlowRightBarProps) {

    const [t] = useTranslation()

    return (
        <div>

            <Tabs
                defaultActiveKey="states"
                centered
                size={"small"}
                items={[
                    {
                        label: t("states"),
                        key: "states",
                    }
                ]}


            />

            <Flex
                vertical
            >
                <_StatesHierarchy flow={flow}/>
            </Flex>
        </div>
    )

}


function _StatesHierarchy({flow}: FlowRightBarProps) {
    const [t] = useTranslation()

    const {activate, deactivate} = useTurtleModal()

    const [data, setData] = React.useState<Array<TreeDataNode>>(createHierarchy())

    function createHierarchy(): Array<TreeDataNode> {

        return [
            {
                key: "states",
                title: (
                    <Flex>
                        {t("states")} ({flow.states.size})

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={createFlowState}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: Array.from(flow.states.entries()).map(([stateName, stateData]) => {

                    return {
                        key: stateName,
                        title: (
                            <HierarchyFlex>


                                <Space>
                                    <IconColor
                                        color={FlowTypes.GetVariableColor(stateData.type)}
                                        width="20px"
                                    />

                                    <div>{stateName}</div>
                                </Space>

                                <HierarchyRightFlex>
                                    <HierarchyDeleteButton onClick={() => {
                                        deleteState(stateName)
                                    }}/>
                                </HierarchyRightFlex>
                            </HierarchyFlex>
                        ),
                    }
                })
            }
        ]
    }


    function createFlowState() {

        activate({
            title: t("create.flow.state"),
            closable: true,
            content: (
                <_CreateStateView
                    flow={flow}
                    onSubmit={() => {
                        deactivate()
                        refresh()
                    }}/>
            )
        })
    }

    async function deleteState(stateUid: string) {
        TurtleApp.Lock()
        flow.states.delete(stateUid)
        TurtleApp.Unlock()
        refresh()
    }

    function refresh() {
        setData(createHierarchy())
    }

    React.useEffect(() => {
        refresh()
    }, [])

    return (
        <Tree
            key={flow.states.size}
            blockNode
            virtual
            showLine
            treeData={data}
            defaultExpandAll={true}
        />
    )
}

function _CreateStateView({flow, onSubmit}) {


    const creation = React.useMemo(() => ({
        name: "NewState",
        valData: {
            type: "string"
        }
    }), [])

    return (
        <Form layout={"vertical"}>

            <Flex vertical gap={15}>
                <StringAttributeView entity={creation} attribute={"name"}/>

                <SelectItemRaw
                    entity={creation.valData}
                    attribute={"type"}
                    size={"middle"}
                >

                    {
                        ["string", "float64", "boolean"].map((val) => {
                            return (
                                <Select.Option
                                    value={val}
                                    key={val}
                                >
                                    <Space>
                                        <IconColor
                                            color={FlowTypes.GetVariableColor(val)}
                                            width="20px"
                                        />

                                        <div>{val}</div>
                                    </Space>
                                </Select.Option>
                            )
                        })
                    }
                </SelectItemRaw>

                <RightSubmitButton
                    onClick={() => {
                        flow.states.set(creation.name, creation.valData)
                        onSubmit()
                    }}/>
            </Flex>

        </Form>
    )
}