import React from "react"
import {LLMAgent, LLMAgentTestResponse} from "@Turtle/LLM/Data/LLMAgent";
import {Flex, Form, Spin, Timeline, Typography} from "antd";
import TextArea from "antd/es/input/TextArea";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import LLMAgentApi from "@Turtle/LLM/Api/LLMAgentApi";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;
import {useTranslation} from "react-i18next";
import LLModelSelect from "@Turtle/LLM/LLMsDock/LLMModelsSelect";


interface TestLLMAgentViewProps {
    agent: LLMAgent
}


enum ProgressStates {
    START = 0,
    LOADING = 1,
    TESTED = 2
}

export default function TestLLMAgentView({agent}: TestLLMAgentViewProps) {

    const [t] = useTranslation()

    const [activeModel, setActiveModel] = React.useState("")

    const [progressState, setProgressState] = React.useState<ProgressStates>(ProgressStates.START)

    const [testResponse, setTestResponse] = React.useState<LLMAgentTestResponse | null>(null)

    const [commandText, setCommandText] = React.useState(agent.commandExample)

    function testAgent() {
        setProgressState(ProgressStates.LOADING)
        LLMAgentApi.TestAgent(agent.uid, activeModel, commandText).then(backendResponse)
    }

    function backendResponse(response: LLMAgentTestResponse) {
        setTestResponse(response)
        setProgressState(ProgressStates.TESTED)
    }

    return (
        <Form layout={"vertical"}>

            <Form.Item label={"Test LLMAgent:"}>
                <TextArea
                    defaultValue={agent.commandExample}
                    disabled={progressState !== ProgressStates.START}
                    onChange={(e) => [
                        setCommandText(e.target.value)
                    ]}
                />
            </Form.Item>

            <LLModelSelect
                defaultValue={activeModel}
                modelChanged={setActiveModel}
            />

            {
                progressState === ProgressStates.START && (
                    <RightSubmitButton onClick={testAgent}/>
                )
            }

            {
                progressState === ProgressStates.LOADING && (
                    <Timeline
                        pending={t("generating")}
                        items={[
                            {
                                color: "gray",
                                children: t("agent.selected")
                            },
                            {
                                color: "gray",
                                children: t("parameters")
                            },
                            {
                                color: "gray",
                                children: t("agent.called")
                            },
                            {
                                color: "gray",
                                children: t("agent.response.status")
                            }
                        ]}
                    />
                )
            }

            {
                (progressState === ProgressStates.TESTED && testResponse) && (
                    <div>
                        <Timeline
                            items={[
                                {
                                    color: testResponse.agentUid == agent.uid ? "green" : "red",
                                    children: t("agent.selected")
                                },
                                {
                                    color: "gray",

                                    children: (
                                        <Flex vertical gap={10}>
                                            {t("tools")}

                                            {
                                                testResponse.agentToolUsage.map((val, index) => {
                                                    return (
                                                        <Timeline
                                                            key={index}
                                                            // items={Object.entries(val).map(([key, value]) => {
                                                            //     return {
                                                            //
                                                            //     }
                                                            // })}
                                                            items={[
                                                                {
                                                                    color: "red",
                                                                    children: `$name="Some name"`
                                                                },
                                                                {
                                                                    color: "red",
                                                                    children: `date="07.06.1997"`
                                                                },
                                                            ]}
                                                            style={{
                                                                paddingBottom: 0
                                                            }}
                                                        />
                                                    )
                                                })
                                            }

                                        </Flex>
                                    )
                                },
                                {
                                    color: "gray",
                                    children: t("agent.called")
                                },
                                {
                                    color: "gray",
                                    children: t("agent.response.status")
                                }
                            ]}
                        />

                        <div>{testResponse.uid}</div>
                        <div>{testResponse.text}</div>
                        <div>{testResponse.error}</div>


                        <Form.Item label={`${t("reasoning")}:`}>
                            <TextArea

                                onChange={(e) => {
                                    e.preventDefault()
                                }}
                                value={testResponse.result.reasoning}
                            />
                        </Form.Item>
                    </div>
                )
            }


        </Form>
    )

}