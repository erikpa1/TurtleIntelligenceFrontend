import React from "react"
import {Splitter} from "antd"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import LLMAgentsHierarchy from "@Turtle/LLM/LLMAgentsDock/LLMAgentsHierarchy";
import {useParams} from "react-router-dom";

import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import LLMAgentEditCanvas from "@Turtle/LLM/LLMAgentsDock/Edit/LLMAgentEditCanvas";
import CanvasTopBar from "@Turtle/LLM/LLMAgentsDock/Edit/CanvasTopBar";


export default function LLMAgentsDock() {

    const {agentUid} = useParams()

    const {bigPadding} = useTurtleTheme()


    return (
        <SplitterWithHeader topbar={(<>
            {
                agentUid && (
                    <CanvasTopBar/>
                )
            }
        </>)}>

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
                        <LLMAgentEditCanvas agentUid={agentUid}/>
                    )
                }

            </Splitter.Panel>
        </SplitterWithHeader>
    )


}