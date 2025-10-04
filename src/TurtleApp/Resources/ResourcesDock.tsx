import React from 'react';
import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import {Splitter} from "antd";
import ResourcesHierarchy from "@TurtleApp/Resources/ResourcesHierarchy";
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";

export default function ResourcesDock() {


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
                <ResourcesHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel defaultSize={"80%"}>

            </Splitter.Panel>


        </SplitterWithHeader>
    )
}