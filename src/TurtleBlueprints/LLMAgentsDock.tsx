import React from "react"
import {Splitter} from "antd"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import LLMAgentsHierarchy from "@TurtleBlueprints/LLMAgentsHierarchy";
import {useParams} from "react-router-dom";

import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import LLMAgentEditCanvas from "@TurtleBlueprints/Edit/NodesCanvas";
import NodesCanvasTopBar from "@TurtleBlueprints/Edit/NodesCanvasTopBar";

import NodesFactory from "@TurtleBlueprints/Data/NodesFactory"
import NodesLibrary from "@TurtleBlueprints/Data/NodesLibrary"


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
                    <NodesCanvasTopBar/>
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
