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


interface GenericHierarchyProps {
    couComponent?: any
    moduleName: string
    listFunction: () => Promise<Array<any>>
    createFunction?: (element: any) => Promise<void>
    deleteFunction?: (elementUid: string) => Promise<void>


}


export default function GenericHierarchy(props: GenericHierarchyProps) {


    const [t] = useTranslation()

    const [key, setKey] = React.useState("")
    const {activate, deactivate} = useTurtleModal()
    const [data, setData] = React.useState<TreeDataNode[]>(createHierarchy([]))

    function createHierarchy(elements: any[]): TreeDataNode[] {
        return [
            {
                key: "forecasts",
                title: (
                    <Flex gap={15}>
                        <HierarchyCustomIcon icon={<IconSimulation/>}/>

                        <div>{t(props.moduleName)} ({elements.length})</div>

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={createForecast}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: elements.map((val) => {
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

                                    {
                                        props.deleteFunction && (
                                            <HierarchyDeleteButton onClick={() => {
                                                deleteForecast(val.uid)
                                            }}/>
                                        )
                                    }

                                </HierarchyRightFlex>
                            </Flex>
                        ),

                    }
                })
            }
        ]
    }


    async function deleteForecast(forecastUid: string) {
        if (props.deleteFunction) {
            TurtleApp.Lock()
            await props.deleteFunction(forecastUid)
            TurtleApp.Unlock()
        }

    }

    function editForecast(forecast: Forecast) {

        activate({
            title: `${t(`edit.${props.moduleName}`)}:`,
            content: (
                <props.couComponent
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
            title: `${t(`create.${props.moduleName}`)}:`,
            content: (
                <props.couComponent
                    forecast={tmp}
                    onBeforeSubmit={deactivate}
                    onAfterSubmit={refresh}
                />
            )
        })

    }

    async function refresh() {

        const data = await props.listFunction()
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