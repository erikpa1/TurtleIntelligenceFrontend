import React from 'react';
import {Flex, Space, Tree, TreeDataNode} from "antd";
import {Forecast} from "@TurtleApp/Forecasting/Forecast";
import {
    HierarchyAddButton,
    HierarchyCustomIcon,
    HierarchyDeleteButton, HierarchyEditButton,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";
import {useTranslation} from "react-i18next";
import TimeManager from "@Turtle/Tools/TimeManager";
import COUForecast from "@TurtleApp/Forecasting/COUForecast";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import ForecastApi from "@TurtleApp/Forecasting/ForecastsApi";
import Icon from "@ant-design/icons";
import IconAutoRenew from "@Turtle/Icons/IconAutoRenew";
import TurtleApp from "@TurtleApp/TurtleApp";
import {IconSimulation} from "@Turtle/Icons";

export default function ForecastingHierarchy() {


    const [t] = useTranslation()

    const [key, setKey] = React.useState("")
    const {activate, deactivate} = useTurtleModal()
    const [data, setData] = React.useState<TreeDataNode[]>(createHierarchy([]))

    function createHierarchy(forecasts: Forecast[]): TreeDataNode[] {
        return [
            {
                key: "forecasts",
                title: (
                    <Flex gap={15}>
                        <HierarchyCustomIcon icon={<IconSimulation/>}/>

                        <div>{t("forecasts")} ({forecasts.length})</div>

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={createForecast}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: forecasts.map((val) => {
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