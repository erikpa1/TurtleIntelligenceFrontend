import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import {Splitter} from "antd";

import React from "react";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";

export default function TablesDock() {

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

            </Splitter.Panel>

            <Splitter.Panel defaultSize={"80%"}>

            </Splitter.Panel>
        </SplitterWithHeader>
    )
}