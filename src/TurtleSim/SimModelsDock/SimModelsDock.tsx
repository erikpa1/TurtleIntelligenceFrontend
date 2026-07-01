import React from "react"
import {Splitter, theme as antdTheme} from "antd"
import {useParams} from "react-router-dom"

import SimModelsHierarchy from "@TurtleSim/SimModelsDock/SimModelsHierarchy"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import {SplitterWithHeader} from "@Turtle/Antd/Splitter"
import SimModelsTopBar from "@TurtleSim/SimModelsDock/SimModelsTopBar";



export default function SimModelsDock({}) {

    const {runUid} = useParams()

    const {bigPadding, theme} = useTurtleTheme()

    const {token} = antdTheme.useToken()

    return (
        <SplitterWithHeader
            topbar={<SimModelsTopBar/>}
        >
            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: token.colorBgContainer,
                    padding: bigPadding,
                    height: theme.GetSplitterBigHeight(),

                }}
            >
                <SimModelsHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: token.colorBgContainer,
                    padding: bigPadding,
                    height: theme.GetSplitterBigHeight(),

                }}
            >
                {
                    runUid && (
                        <div>
                            Here
                        </div>
                    )
                }
            </Splitter.Panel>

            <Splitter.Panel defaultSize={"60%"}>

            </Splitter.Panel>
        </SplitterWithHeader>

    )
}