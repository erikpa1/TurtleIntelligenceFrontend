import {useTranslation} from "react-i18next";
import React from "react";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {Flex, Tree, TreeDataNode} from "antd";
import {Forecast} from "@TurtleApp/Forecasting/Forecast";
import {
    HierarchyAddButton,
    HierarchyCustomIcon, HierarchyDeleteButton,
    HierarchyEditButton,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";
import {IconSimulation} from "@Turtle/Icons";
import TurtleApp from "@TurtleApp/TurtleApp";
import ForecastApi from "@TurtleApp/Forecasting/ForecastsApi";
import COUForecast from "@TurtleApp/Forecasting/COUForecast";
import TimeManager from "@Turtle/Tools/TimeManager";
import {TableOutlined} from "@ant-design/icons";

export default function TablesHierarchy() {

    const [t] = useTranslation()

    const [key, setKey] = React.useState("")
    const {activate, deactivate} = useTurtleModal()
    const [data, setData] = React.useState<TreeDataNode[]>(createHierarchy([]))

    function createHierarchy(tables: Forecast[]): TreeDataNode[] {
        return [
            {
                key: "tables",
                title: (
                    <Flex gap={15}>
                        <HierarchyCustomIcon icon={<TableOutlined/>}/>

                        <div>{t("tables")} ({tables.length})</div>

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={createForecast}
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
                                            editForecast(val)
                                        }}
                                    />

                                    <HierarchyDeleteButton onClick={() => {
                                        deleteForecast(val.uid)
                                    }}/>
                                </HierarchyRightFlex>
                            </Flex>
                        ),

                    }
                })
            }
        ]
    }


    async function deleteForecast(forecastUid: string) {
        TurtleApp.Lock()
        await ForecastApi.DeleteForecast(forecastUid)
        TurtleApp.Unlock()
    }

    function editForecast(forecast: Forecast) {

        activate({
            title: `${t("edit.forecast")}:`,
            content: (
                <COUForecast
                    forecast={forecast}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}
                />
            )
        })

    }


    function createForecast() {
        const tmp = new Forecast()
        tmp.name = `Forecast ${TimeManager.GetNowLocalString()}`

        activate({
            title: `${t("create.forecast")}:`,
            content: (
                <COUForecast
                    forecast={tmp}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}
                />
            )
        })

    }

    async function refresh() {

        const data = await ForecastApi.ListForecasts()
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