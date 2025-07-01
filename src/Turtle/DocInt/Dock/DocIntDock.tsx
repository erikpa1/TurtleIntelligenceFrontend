import React from "react"
import {Splitter} from "antd"

import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import DocIntTopBar from "@Turtle/DocInt/Dock/DocIntTopBar";
import DocIntHierarchy from "@Turtle/DocInt/Dock/DocIntHierarchy";
import {useParams} from "react-router-dom";
import DocumentPreview from "@Turtle/DocInt/Dock/DocumentPreview";


export default function DocIntDock({}) {

    const {bigPadding} = useTurtleTheme()

    const {documentUid} = useParams()


    return (
        <div>

            <DocIntTopBar/>

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
                    <DocIntHierarchy/>
                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="80%"
                    style={{
                        height: "95vh",

                    }}
                >
                    {
                        documentUid && (
                            <DocumentPreview documentUid={documentUid} />
                        )
                    }
                </Splitter.Panel>

            </Splitter>

        </div>
    )

}