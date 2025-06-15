import React from "react"
import {useTurtleTheme} from "@Turtle/Zuses/useTurleTheme";
import {Splitter} from "antd";
import LLMsHierarchy from "@Turtle/LLM/LLMsDock/LLMsHierarchy";
import {useParams} from "react-router-dom";
import LLMControl from "@Turtle/LLM/LLMsDock/LLMControl";
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import {LLMTopBar} from "@Turtle/LLM/LLMsDock/LLMTopBar";


export default function LLMsDock() {
    const {bigPadding} = useTurtleTheme()

    const {llmUid} = useParams()

    return (
        <div>

            <LLMTopBar/>

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
                    {
                        llmUid && (<LLMControl llmUid={llmUid}/>)
                    }

                </Splitter.Panel>

            </Splitter>

        </div>

    )
}