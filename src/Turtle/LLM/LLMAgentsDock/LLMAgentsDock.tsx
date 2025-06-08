import React from "react"
import {Splitter} from "antd"
import {useTurtleTheme} from "@Turtle/Zuses/useTurleTheme"
import LLMAgentsHierarchy from "@Turtle/LLM/LLMAgentsDock/LLMAgentsHierarchy";


export default function LLMAgentsDock() {
    const {bigPadding} = useTurtleTheme()


    return (
        <div>
            <Splitter style={{
                height: "100vh",
                // backgroundColor: "#212124"
            }}>

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


                </Splitter.Panel>

            </Splitter>

        </div>

    )
}