import React from "react";
import {Splitter} from "antd";
import SimModelsHierarchy from "@TurtleSim/SimModelsDock/SimModelsHierarchy";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import {SplitterWithHeader} from "@Turtle/Antd/Splitter";


export default function SimModelsDock({}) {

    const {bigPadding, theme} = useTurtleTheme()

    return (
        <SplitterWithHeader topbar={<div/>}>
            <Splitter.Panel
                defaultSize={"20%"}
                style={{
                    backgroundColor: "white",
                    padding: bigPadding,
                    height: theme.GetSplitterBigHeight(),

                }}
            >
                <SimModelsHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel defaultSize={"80%"}>

            </Splitter.Panel>
        </SplitterWithHeader>

    )
}