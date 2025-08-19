import React from "react"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import {Splitter} from "antd"
import ScenesHierarchy from "@Turtle/Scenes/ScenesHierarchy"

export default function ScenesDock() {
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
                    <ScenesHierarchy/>
                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="80%"
                    style={{
                        height: "100vh",

                    }}
                >

                </Splitter.Panel>

            </Splitter>

        </div>
    )

}