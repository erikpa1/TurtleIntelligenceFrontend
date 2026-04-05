import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import ColorConstants from "@Turtle/Constants/ColorConstants";
import {WorldSingleton} from "@TurtleApp/Data/World";
import {useTranslation} from "react-i18next";
import SimFactory from "@TurtleSim/Factories/SimFactory";
import {Flex, Table, TableProps} from "antd";
import React from "react";
import {FlowStage} from "@Turtle/Flows/Flow";


export default function SimStatisticsView({}) {


    const {theme, bigPadding} = useTurtleTheme()

    return (
        <div
            style={{
                position: "relative",
            }}
        >
            <div
                style={{
                    height: `calc(100vh - ${theme.topBarHeightBig} - ${theme.topBarHeightBig} - ${theme.topBarHeightBig})`,
                    backgroundColor: ColorConstants.WHITE,
                    padding: bigPadding
                }}
            >
                <_StatisticsPreview/>
            </div>
        </div>
    )
}

function _StatisticsPreview({}) {


    const processes = WorldSingleton.I.GetEntitiesOfType(SimFactory.TYPE_PROCESS)

    return (
        <Flex vertical>

            {
                processes.length > 0 && (
                    <_WorkCentersFragment processes={processes.map((val) => ({
                        name: val.name,
                        working: 0,
                        idle: 0,
                        blocked: 0,
                    }))}/>
                )
            }

        </Flex>
    )
}

interface _WorkCenterStats {
    name: string
    idle: 0
    working: 0
    blocked: 0
}

interface _WorkCentersFragmentProps {
    processes: Array<_WorkCenterStats>
}

function _WorkCentersFragment({processes}: _WorkCentersFragmentProps) {

    const [t] = useTranslation()

    const columns: TableProps<FlowStage>['columns'] = React.useMemo(() => ([
        {
            title: 'Id',
            key: 'id',
            render: (x, y, index) => {
                return (
                    <div>{index + 1}.</div>
                )
            }
        },
        {
            title: t("name"),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t("working"),
            dataIndex: 'working',
            key: 'working'
        }
    ]), [])

    return (
        <>
            <h2>
                {t("processes")}
            </h2>

            <Table
                pagination={false}
                rowKey={"uid"}
                bordered
                size={"small"}
                dataSource={processes}
                columns={columns as any}
            />

        </>
    )
}