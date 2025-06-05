import {Splitter} from "antd"
import React from "react"

import WorldControllers from "@TurtleApp/Routes/WorldDock/WorldControllers"

import {useTurtleTheme} from "@Turtle/Zuses/useTurleTheme";
import {useParams} from "react-router-dom";
import LLMChatTopBar from "@Turtle/LLM/AiChatDock/LLMChatTopBar";
import LLMChatView from "@Turtle/LLM/AiChatDock/LLMChatView";
import LLMChatHierarchy from "@Turtle/LLM/AiChatDock/LLMChatHierarchy";

export default function LLMChatDock() {

    const {bigPadding} = useTurtleTheme()


    const {chatUid} = useParams()


    return (
        <div>

            <LLMChatTopBar/>

            <Splitter style={{
                height: "100%",
                // backgroundColor: "#212124"
            }}>

                <Splitter.Panel
                    defaultSize="20%"
                    style={{
                        backgroundColor: "white",
                        padding: bigPadding
                    }}
                >
                    <LLMChatHierarchy/>
                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="80%"
                    style={{
                        height: "95vh",

                    }}
                >
                    <LLMChatView chatUid={chatUid ?? "new"}/>


                </Splitter.Panel>

            </Splitter>

        </div>

    )
}

