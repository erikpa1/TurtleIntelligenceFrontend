import React from "react"
import {Splitter} from "antd"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import LLMAgentsHierarchy from "@Turtle/LLM/LLMAgentsDock/LLMAgentsHierarchy";
import {useParams} from "react-router-dom";

import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import LLMAgentEditCanvas from "@Turtle/LLM/LLMAgentsDock/Edit/NodesCanvas";
import CanvasTopBar from "@Turtle/LLM/LLMAgentsDock/Edit/CanvasTopBar";

import NodesFactory from "@Turtle/LLM/LLMAgentsDock/Data/NodesFactory"
import NodesLibrary from "@Turtle/LLM/LLMAgentsDock/Data/NodesLibrary"


export default function LLMAgentsDock() {

    const {agentUid} = useParams()

    const {bigPadding, theme} = useTurtleTheme()

    React.useEffect(() => {
        NodesLibrary.InitNodesFactory()
        return () => {
            NodesFactory.CleanUp()
        }
    }, [])


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
                style={{
                    height: `calc(100dvh + ${theme.topBarHeightBig})`,
                    // height: 2000
                }}
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
