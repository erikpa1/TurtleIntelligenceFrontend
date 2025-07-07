import React from "react"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"

import {Splitter} from "antd";
import FunctionsHierarchy from "@Turtle/Functions/FunctionsHierarchy"
import FlowsTopBar from "@Turtle/Flows/FlowsTopBar"
import FlowsHierarchy from "@Turtle/Flows/FlowsHierarchy";
import FlowEditor from "@Turtle/Flows/FlowEditor/FlowEditor";
import {useParams} from "react-router-dom";
import FlowEditorSplit from "@Turtle/Flows/FlowEditor/FlowEditorSplit";

export default function FlowsDock({}: any) {

    const {bigPadding} = useTurtleTheme()

    const {flowUid} = useParams()

    console.log(flowUid)

    return (
        <div>

            <FlowsTopBar/>

            <Splitter style={{
                height: "100%",
                // backgroundColor: "#212124"
            }}>

                <Splitter.Panel
                    defaultSize="20%"
                    style={{
                        height: "95vh",
                        backgroundColor: "white",
                        padding: bigPadding
                    }}
                >
                    <FlowsHierarchy/>
                </Splitter.Panel>


                {
                    flowUid && (
                        React.Children.toArray(FlowEditorSplit(flowUid))
                    )
                }


            </Splitter>

        </div>

    )
}

