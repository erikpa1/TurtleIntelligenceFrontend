import React from "react"
import {LLMAgent, LLMAgentTestResponse} from "@Turtle/LLM/Data/LLMAgent";
import {Form, Spin} from "antd";
import TextArea from "antd/es/input/TextArea";
import {RightSubmitButton} from "@Turtle/Components/RightSubmitButton";
import LLMAgentApi from "@Turtle/LLM/Api/LLMAgentApi";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;


interface TestLLMAgentViewProps {
    agent: LLMAgent
}


enum ProgressStates {
    START = 0,
    LOADING = 1,
    TESTED = 2
}

export default function TestLLMAgentView({agent}: TestLLMAgentViewProps) {

    const [progressState, setProgressState] = React.useState(ProgressStates.START)

    const [testResponse, setTestResponse] = React.useState<LLMAgentTestResponse | null>(null)

    const [commandText, setCommandText] = React.useState(agent.commandExample)

    function testAgent() {
        setProgressState(ProgressStates.LOADING)
        LLMAgentApi.TestAgent(agent.uid, commandText).then(backendResponse)
    }

    function backendResponse(response: LLMAgentTestResponse) {
        setTestResponse(response)
        setProgressState(ProgressStates.TESTED)
    }

    if (progressState == ProgressStates.START) {

        return (
            <Form layout={"vertical"}>

                <Form.Item label={"Test LLMAgent:"}>
                    <TextArea
                        defaultValue={agent.commandExample}
                        onChange={(e) => [
                            setCommandText(e.target.value)
                        ]}
                    />
                </Form.Item>

                <RightSubmitButton onClick={testAgent}/>

            </Form>
        )
    } else if (progressState == ProgressStates.LOADING) {
        return (
            <Spin/>
        )
    } else if (progressState == ProgressStates.TESTED) {
        return (
            <div>
                {
                    testResponse && (
                        <div>
                            <div>{testResponse.uid}</div>
                            <div>{testResponse.text}</div>
                            <div>{testResponse.error}</div>
                            <div>{testResponse.result.reasoning}</div>
                        </div>
                    )
                }
            </div>

        )
    } else {
        return (
            <div/>
        )
    }

}