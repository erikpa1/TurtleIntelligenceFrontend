import React from 'react'
import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import {Splitter} from 'antd';
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import TablesHierarchy from "@Turtle/Tables/TablesHierarchy";
import {useParams} from "react-router-dom";
import TableInstanceHierarchy from "@Turtle/Tables/TablesInstanceHierarchy";
import TableDataEditView from "@Turtle/Tables/TableDataEditView";

export default function TablesDock() {

    const {bigPadding, theme} = useTurtleTheme()

    const {tableUid} = useParams()

    return (
        <SplitterWithHeader topbar={(
            <div/>
        )}>

            <Splitter.Panel
                defaultSize="25%"
                style={{
                    backgroundColor: "white",
                    padding: bigPadding,
                }}
            >
                <TablesHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel
                defaultSize="25%"
                style={{
                    backgroundColor: "white",
                    padding: bigPadding,

                }}
            >
                <TableInstanceHierarchy/>
            </Splitter.Panel>

            <Splitter.Panel
                defaultSize="50%"
                style={{
                    backgroundColor: "white",
                }}
            >
                <TableDataEditView/>
            </Splitter.Panel>


        </SplitterWithHeader>
    )
}