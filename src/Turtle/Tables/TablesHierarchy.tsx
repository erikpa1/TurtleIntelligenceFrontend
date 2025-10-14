import {useTranslation} from "react-i18next";
import React from "react";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {Flex, Tree, TreeDataNode} from "antd";

import {
    HierarchyAddButton,
    HierarchyCustomIcon, HierarchyDeleteButton,
    HierarchyEditButton,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";

import TurtleApp from "@TurtleApp/TurtleApp";

import TimeManager from "@Turtle/Tools/TimeManager";
import {TableOutlined} from "@ant-design/icons";
import {TurtleTable} from "@Turtle/Tables/Table";
import COUTable from "@Turtle/Tables/COUTable";
import TablesApi from "@Turtle/Tables/TablesApi";

export default function TablesHierarchy() {

    const [t] = useTranslation()

    const [key, setKey] = React.useState("")
    const {activate, deactivate} = useTurtleModal()
    const [data, setData] = React.useState<TreeDataNode[]>(createHierarchy([]))

    function createHierarchy(tables: TurtleTable[]): TreeDataNode[] {
        return [
            {
                key: "tables",
                title: (
                    <Flex gap={15}>
                        <HierarchyCustomIcon icon={<TableOutlined/>}/>

                        <div>{t("tables")} ({tables.length})</div>

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={createTable}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: tables.map((val) => {
                    return {
                        key: val.name,
                        title: (
                            <Flex>
                                {val.name}

                                <HierarchyRightFlex>

                                    <HierarchyEditButton
                                        onClick={() => {
                                            editTable(val)
                                        }}
                                    />

                                    <HierarchyDeleteButton onClick={() => {
                                        deleteTable(val.uid)
                                    }}/>
                                </HierarchyRightFlex>
                            </Flex>
                        ),

                    }
                })
            }
        ]
    }


    async function deleteTable(forecastUid: string) {
        TurtleApp.Lock()
        await TablesApi.Delete(forecastUid)
        TurtleApp.Unlock()
        refresh()
    }

    function editTable(table: TurtleTable) {

        activate({
            title: `${t("edit.forecast")}:`,
            width: 600,
            content: (
                <COUTable
                    table={table}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}
                />
            )
        })

    }


    function createTable() {
        const tmp = new TurtleTable()
        tmp.name = `Table ${TimeManager.GetNowLocalString()}`

        activate({
            title: `${t("create.table")}:`,
            width: 600,
            content: (
                <COUTable
                    table={tmp}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}
                />
            )
        })

    }

    async function refresh() {

        const data = await TablesApi.List()
        setData(createHierarchy(data))
        setKey(crypto.randomUUID())
    }

    React.useEffect(() => {
        refresh()
    }, [])


    return (
        <Tree
            key={key}
            blockNode
            virtual
            showLine
            treeData={data}
            defaultExpandAll={true}
        />
    )
}