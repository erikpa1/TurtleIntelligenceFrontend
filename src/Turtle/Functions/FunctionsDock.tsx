import React from "react"

import {Splitter} from "antd";

import FunctionsTopBar from "@Turtle/Functions/FunctionsTopBar";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import FunctionsHierarchy from "@Turtle/Functions/FunctionsHierarchy";

export default function FunctionsDock() {

    const {bigPadding} = useTurtleTheme()


    return (
        <div>

            <FunctionsTopBar/>

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
                    <FunctionsHierarchy/>
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