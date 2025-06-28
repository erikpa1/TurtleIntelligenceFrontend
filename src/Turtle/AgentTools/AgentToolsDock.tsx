import AgentsToolsTopBar from "@Turtle/AgentTools/AgentToolsTopBar";
import {Splitter} from "antd";
import {useTurtleTheme} from "@Turtle/Zuses/useTurleTheme";
import React from "react";
import AgentToolsHierarchy from "@Turtle/AgentTools/AgentToolHierarchy";
import {useParams} from "react-router-dom";

export default function AgentToolsDock() {

    const {bigPadding} = useTurtleTheme()



    return (
        <div>
            <AgentsToolsTopBar/>

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
                    <AgentToolsHierarchy/>
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