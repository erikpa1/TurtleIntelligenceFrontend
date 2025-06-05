import React from "react"
import {useTurtleTheme} from "@Turtle/Zuses/useTurleTheme";
import {useParams} from "react-router-dom";
import LLMChatTopBar from "@Turtle/LLM/AiChatDock/LLMChatTopBar";
import {Splitter} from "antd";
import LLMChatHierarchy from "@Turtle/LLM/AiChatDock/LLMChatHierarchy";
import LLMChatView from "@Turtle/LLM/AiChatDock/LLMChatView";
import WorldControllers from "@TurtleApp/Routes/WorldDock/WorldControllers";
import LLMsHierarchy from "@Turtle/LLM/LLMsDock/LLMsHierarchy";


export default function LLMsDock() {
    const {bigPadding} = useTurtleTheme()


    return (
        <div>
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
                    <LLMsHierarchy/>
                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="80%"
                    style={{
                        height: "95vh",

                    }}
                >


                </Splitter.Panel>

            </Splitter>

        </div>

    )
}