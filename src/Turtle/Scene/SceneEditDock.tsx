import React from "react"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import {Splitter} from "antd"
import SceneHierarchy from "@Turtle/Scene/SceneHierarchy";
import {useParams} from "react-router-dom";


export default function SceneEditDock() {
    const {bigPadding} = useTurtleTheme()

    const {sceneUid} = useParams()

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
                    <SceneHierarchy/>
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