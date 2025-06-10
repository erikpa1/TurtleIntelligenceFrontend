import React from "react"
import {Splitter} from "antd"

import {useTurtleTheme} from "@Turtle/Zuses/useTurleTheme"
import DocIntTopBar from "@Turtle/DocInt/Dock/DocIntTopBar";
import DocIntHierarchy from "@Turtle/DocInt/Dock/DocIntHierarchy";


export default function DocIntDock({}) {

    const {bigPadding} = useTurtleTheme()


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

                </Splitter.Panel>

            </Splitter>

        </div>
    )

}