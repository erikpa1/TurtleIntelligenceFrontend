import React from "react"
import {Splitter} from "antd"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import LLMAgentsHierarchy from "@Turtle/LLM/LLMAgentsDock/LLMAgentsHierarchy";
import {useParams} from "react-router-dom";

import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import LLMAgentEditCanvas from "@Turtle/LLM/LLMAgentsDock/Edit/LLMAgentEditCanvas";
import CanvasTopBar from "@Turtle/LLM/LLMAgentsDock/Edit/CanvasTopBar";
import NodesLibrary from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodesLibrary";
import NodesFactory from "@Turtle/LLM/LLMAgentsDock/Data/Nodes/NodesFactory";
import COUHttpTriggerView from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/COUHttpTriggerView";
import COUWriteToFileView from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/COUWriteToFileView";
import COULLMNodeView from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/COULLMNodeView";
import COUOllamaView from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/COUOllamaView";
import COUMongoDb from "@Turtle/LLM/LLMAgentsDock/Edit/EditViews/COUMongoDb";
import IconOllama from "@Turtle/Icons/IconOllama";


export default function LLMAgentsDock() {

    const {agentUid} = useParams()

    const {bigPadding, theme} = useTurtleTheme()

    React.useEffect(() => {

        NodesFactory.Register({
            type: "httpTrigger",
            couComponent: COUHttpTriggerView,

        })

        NodesFactory.Register({
            type: "writeToFile",
            couComponent: COUWriteToFileView,
        })

        NodesFactory.Register({
            type: "llmAgent",
            couComponent: COULLMNodeView,
        })

        NodesFactory.Register({
            type: "ollama",
            couComponent: COUOllamaView,
            icon: IconOllama
        })

        NodesFactory.Register({
            type: "mongoDb",
            couComponent: COUMongoDb,
            icon: "/icons/mongo_short.svg"
        })


        NodesFactory.Register({
            type: "sqlite",
            icon: "/icons/sqlite.svg"
        })

        NodesFactory.Register({
            type: "mysql",
            icon: "/icons/mariaDb.svg"
        })


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