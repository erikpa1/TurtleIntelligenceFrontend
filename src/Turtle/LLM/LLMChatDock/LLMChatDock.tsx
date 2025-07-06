import React from "react"
import {useParams} from "react-router-dom"

import {Splitter} from "antd"

import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"

import LLMChatTopBar from "@Turtle/LLM/LLMChatDock/LLMChatTopBar"
import LLMChatView from "@Turtle/LLM/LLMChatDock/LLMChatView"
import LLMChatHierarchy from "@Turtle/LLM/LLMChatDock/LLMChatHierarchy"

export default function LLMChatDock({isAgentChat = false}) {

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
                    <LLMChatView
                        chatUid={chatUid ?? "new"}
                        isAgentChat={isAgentChat}
                    />


                </Splitter.Panel>

            </Splitter>

        </div>

    )
}

