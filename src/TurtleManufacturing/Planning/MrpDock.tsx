import React from "react"
import {
    Alert,
    Button,
    Empty,
    Flex,
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
import {MrpApi, MrpResult, PlannedOrder, RequirementRow} from "@TurtleManufacturing/Data/PlanningApi"

// MrpDock runs the material requirements planning engine and renders the
// classic MRP outputs: planned orders, the netting table and exceptions.
export default function MrpDock() {
    const [t] = useTranslation()
    const {token} = antdTheme.useToken()
    const {bigPadding, theme} = useTurtleTheme()

    const [result, setResult] = React.useState<MrpResult | null>(null)
    const [running, setRunning] = React.useState(false)

    async function run() {
        setRunning(true)
        try {
            const res = await MrpApi.Run()
            setResult(res)
            message.success(t("MRP run complete"))
        } finally {
            setRunning(false)
        }
    }

    React.useEffect(() => {
        run()
    }, [])

    const errors = result?.exceptions.filter((e) => e.severity === "error") ?? []
    const warnings = result?.exceptions.filter((e) => e.severity === "warning") ?? []
    const production = result?.plannedOrders.filter((p) => p.orderType === "production").length ?? 0
    const purchase = result?.plannedOrders.filter((p) => p.orderType === "purchase").length ?? 0

    const orderColumns: ColumnsType<PlannedOrder> = [
        {title: t("Level"), dataIndex: "bomLevel", width: 70},
        {title: t("SKU"), dataIndex: "sku", width: 140, render: (v) => <Typography.Text strong>{v}</Typography.Text>},
        {title: t("Name"), dataIndex: "name"},
        {
            title: t("Type"),
            dataIndex: "orderType",
            width: 130,
            render: (v) => (
                <Tag color={v === "production" ? "geekblue" : "green"}>{t(`order.${v}`)}</Tag>
            ),
        },
        {
            title: t("Quantity"),
            dataIndex: "quantity",
            width: 120,
            align: "right",
            render: (v, r) => `${v} ${r.uom}`,
        },
        {title: t("Release date"), dataIndex: "releaseDate", width: 130},
        {title: t("Due date"), dataIndex: "dueDate", width: 130},
    ]

    const reqColumns: ColumnsType<RequirementRow> = [
        {title: t("Level"), dataIndex: "bomLevel", width: 70},
        {title: t("SKU"), dataIndex: "sku", width: 140, render: (v) => <Typography.Text strong>{v}</Typography.Text>},
        {title: t("Name"), dataIndex: "name"},
        {title: t("Gross req."), dataIndex: "grossRequirement", width: 110, align: "right"},
        {title: t("On hand"), dataIndex: "onHand", width: 100, align: "right"},
        {title: t("Safety"), dataIndex: "safetyStock", width: 90, align: "right"},
        {
            title: t("Net req."),
            dataIndex: "netRequirement",
            width: 100,
            align: "right",
            render: (v) => (
                <Typography.Text type={v > 0 ? "warning" : undefined}>{v}</Typography.Text>
            ),
        },
        {
            title: t("Planned order"),
            dataIndex: "plannedOrder",
            width: 120,
            align: "right",
            render: (v) => (v > 0 ? <Typography.Text strong>{v}</Typography.Text> : v),
        },
        {
            title: t("Procurement"),
            dataIndex: "procurementType",
            width: 120,
            render: (v) => <Tag>{t(`procurement.${v}`)}</Tag>,
        },
        {title: t("Required date"), dataIndex: "requiredDate", width: 130},
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
                    {t("MRP · Material Requirements Planning")}
                </Typography.Title>
                <Button type={"primary"} loading={running} onClick={run}>
                    {t("Run MRP")}
                </Button>
            </Flex>

            {result && (
                <Flex gap={16} wrap>
                    <_Stat label={t("Planned orders")} value={result.plannedOrders.length}/>
                    <_Stat label={t("Production")} value={production}/>
                    <_Stat label={t("Purchase")} value={purchase}/>
                    <_Stat label={t("Exceptions")} value={result.exceptions.length}
                           danger={errors.length > 0}/>
                    <_Stat label={t("Generated")}
                           value={result.generatedAt ? new Date(result.generatedAt).toLocaleString() : "—"}/>
                </Flex>
            )}

            {errors.length > 0 && (
                <Alert
                    type={"error"}
                    showIcon
                    message={t("Planning errors")}
                    description={
                        <ul style={{margin: 0, paddingLeft: 18}}>
                            {errors.map((e, i) => (
                                <li key={i}>{e.sku ? `${e.sku}: ` : ""}{e.message}</li>
                            ))}
                        </ul>
                    }
                />
            )}

            {!result ? (
                <Empty description={t("Run MRP to generate a plan")}/>
            ) : (
                <Tabs
                    items={[
                        {
                            key: "orders",
                            label: `${t("Planned orders")} (${result.plannedOrders.length})`,
                            children: (
                                <Table<PlannedOrder>
                                    rowKey={(r) => `${r.itemUid}-${r.orderType}-${r.releaseDate}`}
                                    size={"small"}
                                    columns={orderColumns}
                                    dataSource={result.plannedOrders}
                                    pagination={false}
                                />
                            ),
                        },
                        {
                            key: "requirements",
                            label: `${t("Requirements")} (${result.requirements.length})`,
                            children: (
                                <Table<RequirementRow>
                                    rowKey={"itemUid"}
                                    size={"small"}
                                    columns={reqColumns}
                                    dataSource={result.requirements}
                                    pagination={false}
                                    scroll={{x: 1100}}
                                />
                            ),
                        },
                        {
                            key: "exceptions",
                            label: `${t("Exceptions")} (${result.exceptions.length})`,
                            children:
                                result.exceptions.length === 0 ? (
                                    <Empty description={t("No exceptions")}/>
                                ) : (
                                    <Flex vertical gap={8}>
                                        {result.exceptions.map((e, i) => (
                                            <Alert
                                                key={i}
                                                type={e.severity === "error" ? "error" : "warning"}
                                                showIcon
                                                message={`${e.sku ? e.sku + ": " : ""}${e.message}`}
                                            />
                                        ))}
                                    </Flex>
                                ),
                        },
                    ]}
                />
            )}

            {warnings.length > 0 && result && (
                <Typography.Text type={"secondary"}>
                    {warnings.length} {t("warning(s) — see the Exceptions tab")}
                </Typography.Text>
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
