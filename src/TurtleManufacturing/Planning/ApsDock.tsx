import React from "react"
import {
    Alert,
    Button,
    Empty,
    Flex,
    Progress,
    Statistic,
    Table,
    Tabs,
    Tag,
    Typography,
    message,
    theme as antdTheme,
} from "antd"
import type {ColumnsType} from "antd/es/table"
import {useTranslation} from "react-i18next"

import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import {ApsApi, ApsResult, ScheduledOperation, WorkCenterLoad} from "@TurtleManufacturing/Data/PlanningApi"
import ApsGantt from "@TurtleManufacturing/Planning/ApsGantt"

// ApsDock runs the finite-capacity scheduler and renders the resulting Gantt
// chart, work-center load and operation list.
export default function ApsDock() {
    const [t] = useTranslation()
    const {token} = antdTheme.useToken()
    const {bigPadding, theme} = useTurtleTheme()

    const [result, setResult] = React.useState<ApsResult | null>(null)
    const [running, setRunning] = React.useState(false)

    async function run() {
        setRunning(true)
        try {
            const res = await ApsApi.Run()
            // Go marshals empty slices as null — normalise to arrays.
            res.operations = res.operations ?? []
            res.workCenterLoads = res.workCenterLoads ?? []
            res.unscheduled = res.unscheduled ?? []
            setResult(res)
            message.success(t("Schedule generated"))
        } finally {
            setRunning(false)
        }
    }

    React.useEffect(() => {
        run()
    }, [])

    const fmt = (iso: string) =>
        iso ? new Date(iso).toLocaleString([], {month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"}) : "—"

    const lateCount = result?.operations.filter((o) => o.late).length ?? 0

    const loadColumns: ColumnsType<WorkCenterLoad> = [
        {title: t("Work center"), dataIndex: "workCenterName"},
        {title: t("Operations"), dataIndex: "operations", width: 120, align: "right"},
        {title: t("Load (h)"), dataIndex: "loadHours", width: 110, align: "right"},
        {title: t("Capacity (h)"), dataIndex: "capacityHours", width: 130, align: "right"},
        {
            title: t("Utilization"),
            dataIndex: "utilization",
            width: 220,
            render: (v) => (
                <Progress
                    percent={Math.min(100, Math.round(v))}
                    status={v > 100 ? "exception" : "normal"}
                    format={() => `${Math.round(v)}%`}
                />
            ),
        },
    ]

    const opColumns: ColumnsType<ScheduledOperation> = [
        {title: t("Order"), dataIndex: "sku", width: 130, render: (v) => <Typography.Text strong>{v}</Typography.Text>},
        {title: t("Seq"), dataIndex: "sequence", width: 60},
        {title: t("Operation"), dataIndex: "operationName"},
        {title: t("Work center"), dataIndex: "workCenterName", width: 180},
        {title: t("Qty"), dataIndex: "quantity", width: 80, align: "right"},
        {title: t("Start"), dataIndex: "start", width: 160, render: fmt},
        {title: t("End"), dataIndex: "end", width: 160, render: fmt},
        {title: t("Hours"), dataIndex: "durationHours", width: 90, align: "right"},
        {
            title: t("Status"),
            dataIndex: "late",
            width: 100,
            render: (late) => (late ? <Tag color={"red"}>{t("Late")}</Tag> : <Tag color={"green"}>{t("On time")}</Tag>),
        },
    ]

    return (
        <Flex
            vertical
            style={{
                height: theme.GetSplitterBigHeight(),
                padding: bigPadding,
                gap: 16,
                overflow: "auto",
                backgroundColor: token.colorBgLayout,
            }}
        >
            <Flex justify={"space-between"} align={"center"} wrap>
                <Typography.Title level={3} style={{margin: 0}}>
                    {t("APS · Advanced Planning & Scheduling")}
                </Typography.Title>
                <Button type={"primary"} loading={running} onClick={run}>
                    {t("Run scheduler")}
                </Button>
            </Flex>

            {result && (
                <Flex gap={16} wrap>
                    <_Stat label={t("Operations")} value={result.operations.length}/>
                    <_Stat label={t("Work centers")} value={result.workCenterLoads.length}/>
                    <_Stat label={t("Late operations")} value={lateCount} danger={lateCount > 0}/>
                    <_Stat label={t("Horizon start")} value={fmt(result.horizonStart)}/>
                    <_Stat label={t("Horizon end")} value={fmt(result.horizonEnd)}/>
                </Flex>
            )}

            {result && result.unscheduled.length > 0 && (
                <Alert
                    type={"warning"}
                    showIcon
                    message={t("Unscheduled production orders (no routing found)")}
                    description={result.unscheduled.join(", ")}
                />
            )}

            {!result ? (
                <Empty description={t("Run the scheduler to generate a plan")}/>
            ) : result.operations.length === 0 ? (
                <Empty description={t("No production operations to schedule — check MRP, routings and work centers")}/>
            ) : (
                <Tabs
                    items={[
                        {
                            key: "gantt",
                            label: t("Gantt"),
                            children: (
                                <ApsGantt
                                    operations={result.operations}
                                    horizonStart={result.horizonStart}
                                    horizonEnd={result.horizonEnd}
                                />
                            ),
                        },
                        {
                            key: "load",
                            label: `${t("Work center load")} (${result.workCenterLoads.length})`,
                            children: (
                                <Table<WorkCenterLoad>
                                    rowKey={"workCenterUid"}
                                    size={"small"}
                                    columns={loadColumns}
                                    dataSource={result.workCenterLoads}
                                    pagination={false}
                                />
                            ),
                        },
                        {
                            key: "operations",
                            label: `${t("Operations")} (${result.operations.length})`,
                            children: (
                                <Table<ScheduledOperation>
                                    rowKey={(r) => `${r.sku}-${r.sequence}-${r.start}`}
                                    size={"small"}
                                    columns={opColumns}
                                    dataSource={result.operations}
                                    pagination={false}
                                    scroll={{x: 1100}}
                                />
                            ),
                        },
                    ]}
                />
            )}
        </Flex>
    )
}

function _Stat({label, value, danger}: {label: string; value: React.ReactNode; danger?: boolean}) {
    const {token} = antdTheme.useToken()
    return (
        <div
            style={{
                minWidth: 150,
                padding: "12px 20px",
                border: `1px solid ${token.colorBorderSecondary}`,
                backgroundColor: token.colorBgContainer,
            }}
        >
            <Statistic
                title={label}
                value={value as any}
                valueStyle={danger ? {color: token.colorError} : undefined}
            />
        </div>
    )
}
