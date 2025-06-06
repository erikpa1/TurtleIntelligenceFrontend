import React from "react"
import {useTurtleTheme} from "@Turtle/Zuses/useTurleTheme";
import {Splitter} from "antd";
import LLMsHierarchy from "@Turtle/LLM/LLMsDock/LLMsHierarchy";


export default function LLMsDock() {
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
                    <LLMsHierarchy/>
                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="80%"
                >


                </Splitter.Panel>

            </Splitter>

        </div>

    )
}