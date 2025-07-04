import React from "react"
import {Splitter} from "antd"
import {useParams} from "react-router-dom"
import TopBarWrapper from "@Turtle/Components/TopBarWrapper"

import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"

import AgentIncidentPreview from "@Turtle/AgentIncidents/AgentIncidentPreview"
import AgentIncidentsHierarchy from "@Turtle/AgentIncidents/AgentIncidentsHierarchy";

export default function AgentIncidentsDock({}) {


    const {bigPadding} = useTurtleTheme()

    const {incUid} = useParams()

    return (
        <div>

            <TopBarWrapper>
                <div/>
            </TopBarWrapper>

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
                    <AgentIncidentsHierarchy/>
                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="80%"
                    style={{
                        height: "95vh",

                    }}
                >


                    {
                        incUid && (
                            <AgentIncidentPreview incUid={incUid}/>
                        )
                    }
                </Splitter.Panel>

            </Splitter>


        </div>
    )
}