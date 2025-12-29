import {Splitter} from "antd"
import React from "react"

import WorldControllers from "@TurtleSim/SimModelWorldDock/WorldControllers"

import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import LLMClusterHierarchy from "@Turtle/LLM/LLMCluster/LLMClusterHierarchy";
import {useParams} from "react-router-dom";
import LLMClusterPerformanceView from "@Turtle/LLM/LLMCluster/LLMClusterPerformanceView";

export default function LLMClusterDock() {


    const {clusterUid} = useParams()

    const {bigPadding} = useTurtleTheme()


    return (
        <div>
            <Splitter style={{
                height: "100vh",
                // backgroundColor: "#212124"
            }}>

                <Splitter.Panel
                    defaultSize="30%"
                    style={{
                        backgroundColor: "white",
                        padding: bigPadding
                    }}
                >
                    <LLMClusterHierarchy/>
                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="70%"
                    style={{
                        padding: "15px"
                    }}
                >
                    {
                        clusterUid && (
                            <LLMClusterPerformanceView clusterUid={clusterUid}/>
                        )
                    }

                </Splitter.Panel>

            </Splitter>

            <WorldControllers/>
        </div>

    )
}

