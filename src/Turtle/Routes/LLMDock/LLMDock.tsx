import {Splitter} from "antd"
import React from "react"

import WorldControllers from "@TurtleApp/Routes/WorldDock/WorldControllers"
import LLMChatHierarchy from "@Turtle/Routes/LLMDock/LLMChatHierarchy"
import LLMChatTopBar from "@Turtle/Routes/LLMDock/LLMChatTopBar";
import {useTurtleTheme} from "@Turtle/Zuses/useTurleTheme";

export default function LLMDock() {

    const {bigPadding} = useTurtleTheme()

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
                        padding: "15px"
                    }}
                >
                    <div style={{
                        paddingLeft: "15px",
                        paddingRight: "15px"
                    }}>
                        <LLMChatHierarchy/>
                    </div>

                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="80%"
                >
                    <div style={{
                        position: "relative",
                    }}>
                        <div style={{
                            height: "95vh",
                        }}>

                        </div>
                    </div>
                </Splitter.Panel>

            </Splitter>

            <WorldControllers/>
        </div>

    )
}

