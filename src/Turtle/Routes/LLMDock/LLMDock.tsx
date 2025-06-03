import {Splitter} from "antd"
import React from "react"

import WorldControllers from "@TurtleApp/Routes/WorldDock/WorldControllers"
import LLMChatHierarchy from "@Turtle/Routes/LLMDock/LLMChatHierarchy"
import LLMChatTopBar from "@Turtle/Routes/LLMDock/LLMChatTopBar";
import {useTurtleTheme} from "@Turtle/Zuses/useTurleTheme";
import {useParams} from "react-router-dom";
import LLMChatView from "@Turtle/Routes/LLMDock/LLMChatView";

export default function LLMDock() {

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
                    <LLMChatView/>


                </Splitter.Panel>

            </Splitter>

            <WorldControllers/>
        </div>

    )
}

