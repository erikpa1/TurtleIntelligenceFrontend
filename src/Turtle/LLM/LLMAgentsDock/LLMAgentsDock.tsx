import React from "react"
import {Splitter} from "antd"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import LLMAgentsHierarchy from "@Turtle/LLM/LLMAgentsDock/LLMAgentsHierarchy";
import {useParams} from "react-router-dom";
import LLMAgentView from "@Turtle/LLM/LLMAgentsDock/LLMAgentView";
import {SplitterWithHeader} from "@Turtle/Antd/Splitter";


export default function LLMAgentsDock() {

    const {agentUid} = useParams()

    const {bigPadding} = useTurtleTheme()


    return (
        <SplitterWithHeader topbar={<div/>}>

            <Splitter.Panel
                defaultSize="20%"
                style={{
                    backgroundColor: "white",
                    padding: bigPadding
                }}
            >
                <LLMAgentsHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel
                defaultSize="80%"
            >

                {
                    agentUid && (
                        <LLMAgentView agentUid={agentUid}/>
                    )
                }

            </Splitter.Panel>
        </SplitterWithHeader>
    )


}