import {Splitter} from "antd"
import React from "react"

import WorldControllers from "@TurtleApp/Routes/WorldDock/WorldControllers"

import {useTurtleTheme} from "@Turtle/Zuses/useTurleTheme"
import LLMClusterHierarchy from "@Turtle/LLM/LLMCluster/LLMClusterHierarchy";

export default function LLMClusterDock() {

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
                    <LLMClusterHierarchy/>
                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="80%"
                >

                </Splitter.Panel>

            </Splitter>

            <WorldControllers/>
        </div>

    )
}

