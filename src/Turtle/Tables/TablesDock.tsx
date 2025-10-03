import React from 'react'
import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import {Splitter} from 'antd';
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import TablesHierarchy from "@Turtle/Tables/TablesHierarchy";

export default function TablesDock() {

    const {bigPadding, theme} = useTurtleTheme()


    return (
        <SplitterWithHeader topbar={(
            <div/>
        )}>

            <Splitter.Panel
                defaultSize="25%"
                style={{
                    backgroundColor: "white",
                    padding: bigPadding,
                    height: theme.GetSplitterBigHeight(),

                }}
            >
                <TablesHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel
                defaultSize="75%"
                style={{
                    padding: bigPadding,
                    height: theme.GetSplitterBigHeight(),
                }}
            >
            </Splitter.Panel>


        </SplitterWithHeader>
    )
}