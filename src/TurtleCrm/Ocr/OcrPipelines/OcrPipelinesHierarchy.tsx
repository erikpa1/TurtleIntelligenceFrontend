import {useTranslation} from "react-i18next";
import React from "react";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";
import {Flex, Tree, TreeDataNode} from "antd";

import {
    HierarchyAddButton,
    HierarchyCustomIcon,
    HierarchyDeleteButton,
    HierarchyEditButton,
    HierarchyRightFlex
} from "@Turtle/Components/HierarchyComponents";
import {IconSimulation} from "@Turtle/Icons";
import TurtleApp from "@TurtleApp/TurtleApp";
import ForecastApi from "@TurtleApp/Forecasting/ForecastsApi";
import TimeManager from "@Turtle/Tools/TimeManager";
import OcrPipeline from "@TurtleApp/Ocr/Data/OcrPipeline";
import COUOcrPipeline from "@TurtleApp/Ocr/OcrPipelines/CouOcrPipeline";

export default function OcrPipelinesHierarchy({}) {

    const [t] = useTranslation()

    const [key, setKey] = React.useState("")
    const {activate, deactivate} = useTurtleModal()
    const [data, setData] = React.useState<TreeDataNode[]>(createHierarchy([]))

    function createHierarchy(pipelines: OcrPipeline[]): TreeDataNode[] {
        return [
            {
                key: "forecasts",
                title: (
                    <Flex gap={15}>
                        <HierarchyCustomIcon icon={<IconSimulation/>}/>

                        <div>{t("pipelines")} ({pipelines.length})</div>

                        <HierarchyRightFlex>
                            <HierarchyAddButton
                                onClick={createPipeline}
                            />
                        </HierarchyRightFlex>
                    </Flex>
                ),

                children: pipelines.map((val) => {
                    return {
                        key: val.name,
                        title: (
                            <Flex>
                                {val.name}

                                <HierarchyRightFlex>

                                    <HierarchyEditButton
                                        onClick={() => {
                                            editPipeline(val)
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

    function editPipeline(pipeline: OcrPipeline) {

        activate({
            title: `${t("edit.pipeline")}:`,
            content: (
                <COUOcrPipeline
                    pipeline={pipeline}
                    onBeforeUpdate={deactivate}
                    onAfterUpdate={refresh}
                />
            )
        })

    }


    function createPipeline() {
        const pipeline = new OcrPipeline()
        pipeline.name = `OCR pipeline ${TimeManager.GetNowLocalString()}`

        activate({
            title: `${t("create.pipeline")}:`,
            content: (
                <COUOcrPipeline
                    pipeline={pipeline}
                    onBeforeUpdate={deactivate}
                    onAfterUpdate={refresh}
                />
            )
        })

    }

    async function refresh() {

        // const data = await ForecastApi.ListForecasts()
        setData(createHierarchy([]))
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