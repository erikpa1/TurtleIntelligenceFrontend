import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import {useParams} from "react-router-dom";
import {SplitterWithHeader} from "@Turtle/Antd/Splitter";
import {Splitter} from "antd";
import TablesHierarchy from "@Turtle/Tables/TablesHierarchy";
import TableInstanceHierarchy from "@Turtle/Tables/TablesInstanceHierarchy";
import TableDataEditView from "@Turtle/Tables/TableDataEditView";
import React from "react";


export default function TableDataEditDock() {
    const {bigPadding, theme} = useTurtleTheme()


    return (
        <SplitterWithHeader topbar={(
            <div/>
        )}>
            <Splitter.Panel>
                <TableDataEditView/>
            </Splitter.Panel>


        </SplitterWithHeader>
    )
}