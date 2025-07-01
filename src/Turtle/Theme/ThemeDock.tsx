import React from "react"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import {useParams} from "react-router-dom";
import DocIntTopBar from "@Turtle/DocInt/Dock/DocIntTopBar";
import {Splitter} from "antd";
import DocIntHierarchy from "@Turtle/DocInt/Dock/DocIntHierarchy";
import DocumentPreview from "@Turtle/DocInt/Dock/DocumentPreview";

export default function ThemeDock({}) {

    const {bigPadding} = useTurtleTheme()

    const {themeUid} = useParams()

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