import React from "react"
import {LLMAgent, LLMAgentTestResponse} from "@Turtle/LLM/Data/LLMAgent";
import {Flex, Form, Space, Spin, Timeline, Tree, Typography} from "antd";
import TextArea from "antd/es/input/TextArea";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import LLMAgentApi from "@Turtle/LLM/Api/LLMAgentApi";

import {useTranslation} from "react-i18next";
import LLModelSelect from "@Turtle/LLM/LLMsDock/LLMModelsSelect";
import {CheckCircleTwoTone} from "@ant-design/icons";


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
                isDisabled={progressState !== ProgressStates.START}
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
                                    color: "green",
                                    children: (
                                        <Flex vertical gap={10}>
                                            {t("tools.used")}

                                            {
                                                testResponse.agentToolUsage.map((val, index) => {
                                                    return (
                                                        <Tree
                                                            key={val.uid}
                                                            blockNode
                                                            virtual
                                                            showLine
                                                            defaultExpandAll={true}
                                                            treeData={[
                                                                {
                                                                    key: val.uid,
                                                                    title: (
                                                                        <Space>
                                                                            <CheckCircleTwoTone twoToneColor="#52c41a"/>
                                                                            {val.name}
                                                                        </Space>
                                                                    ),

                                                                    children: [
                                                                        {
                                                                            key: "parameters",
                                                                            title: t("parameters"),
                                                                            children: Object.entries(val.parameters).map(([paramName, paramValue]) => {
                                                                                return {
                                                                                    key: paramName,
                                                                                    title: (
                                                                                        <Flex gap={15}>
                                                                                            <b>{paramName}:</b>
                                                                                            "{"{paramValue}"}"
                                                                                        </Flex>
                                                                                    ),

                                                                                }
                                                                            })
                                                                        },
                                                                        {
                                                                            key: "result",
                                                                            title: t("result"),
                                                                        }

                                                                    ]

                                                                }
                                                            ]}
                                                        />
                                                    )
                                                })
                                            }

                                        </Flex>
                                    )
                                },
                                {
                                    color: "green",
                                    children: t("agent.called")
                                },
                            ]}
                        />

                        <div>{testResponse.agentUid}</div>
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