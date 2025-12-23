
import {Flex, Splitter} from "antd";
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import {useAgentExecZus, useAgentNodesZus} from "@Turtle/LLM/LLMAgentsDock/Edit/agentNodeZus";
import TurtleEmpty from "@Turtle/Components/TurtleEmpty";


export default function AgentExecDock() {

    const {pipeline} = useAgentExecZus()

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
                    pipeline.steps.map((val, index) => {
                        return (
                            <Flex>
                                {index +1}, {val.name}
                            </Flex>
                        )
                    })
                }

            </Splitter.Panel>

            <Splitter.Panel
                defaultSize={"30%"}
            >
                <TopBarWrapper>
                    Y
                </TopBarWrapper>
            </Splitter.Panel>

        </Splitter>
    )
}