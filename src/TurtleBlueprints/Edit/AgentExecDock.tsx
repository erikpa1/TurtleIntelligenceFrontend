import React from "react"
import {Flex, Space, Splitter, Tree} from "antd"
import TopBarWrapper from "@Turtle/Components/TopBarWrapper"
import {useAgentExecZus, useAgentNodesZus} from "@TurtleBlueprints/Edit/agentNodeZus";
import TurtleEmpty from "@Turtle/Components/TurtleEmpty";
import {PipelineStep} from "@Turtle/LLM/Data/LLMPipeline"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"


export default function AgentExecDock() {

    const {pipeline} = useAgentExecZus()

    const {bigPadding} = useTurtleTheme()

    const [activeStep, setActiveStep] = React.useState<PipelineStep | null>(null)

    return (
        <Splitter>

            <Splitter.Panel
                defaultSize={"30%"}
            >
                <TopBarWrapper>
                    Agent execution:
                </TopBarWrapper>

                {
                    pipeline.steps.length === 0 && (
                        <TurtleEmpty/>
                    )
                }

                {
                    pipeline.steps.length > 0 && (
                        <_StepsTree steps={pipeline.steps} onSelect={setActiveStep}/>
                    )
                }

            </Splitter.Panel>

            <Splitter.Panel>
                {
                    activeStep && (
                        <div>
                            <TopBarWrapper>
                                <Space>
                                    <b>{activeStep.name}</b>
                                </Space>
                            </TopBarWrapper>

                            <div
                                style={{
                                    padding: bigPadding,
                                }}>
                                {activeStep.dataStr}
                            </div>
                        </div>
                    )
                }

            </Splitter.Panel>

        </Splitter>
    )
}

interface _StepsTreeProps {
    steps: PipelineStep[]
    onSelect: (step: PipelineStep | null) => void
}

function _StepsTree({
                        steps,
                        onSelect
                    }: _StepsTreeProps) {

    return (
        <Tree

            blockNode
            virtual
            showLine
            treeData={steps.map((val, index) => {
                return {
                    key: index,
                    title: (
                        <Flex
                            onClick={() => {
                                onSelect(val)
                            }}
                        >
                            [{index + 1}.] {val.name}
                        </Flex>
                    ),
                }
            })}
            defaultExpandAll={true}
        />
    )

}