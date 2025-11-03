import React from 'react'
import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import {Splitter} from 'antd';
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import TableDataHierarchy from "@Turtle/TablesData/TableDataHierarchy";

export default function TablesDataDock() {


    const {bigPadding, theme} = useTurtleTheme()


    return (
        <SplitterWithHeader topbar={(
            <div>
                Here
            </div>
        )}>

            <Splitter.Panel
                defaultSize="25%"
                style={{
                    backgroundColor: "white",
                    padding: bigPadding,

                }}
            >
                <TableDataHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel
                defaultSize="75%"
                style={{
                    padding: bigPadding,
                }}
            >
            </Splitter.Panel>


        </SplitterWithHeader>
    )
}