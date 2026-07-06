import React from "react"
import {Flex, Tooltip, Typography, theme as antdTheme} from "antd"
import {useTranslation} from "react-i18next"

import {ScheduledOperation} from "@TurtleManufacturing/Data/PlanningApi"

interface ApsGanttProps {
    operations: ScheduledOperation[]
    horizonStart: string
    horizonEnd: string
}

// ApsGantt draws a lightweight finite-capacity Gantt chart: one lane per work
// center, each scheduled operation positioned proportionally along the horizon.
export default function ApsGantt({operations, horizonStart, horizonEnd}: ApsGanttProps) {
    const [t] = useTranslation()
    const {token} = antdTheme.useToken()

    const start = new Date(horizonStart).getTime()
    const end = new Date(horizonEnd).getTime()
    const span = end - start

    if (!operations.length || !(span > 0)) {
        return <Typography.Text type={"secondary"}>{t("Nothing scheduled")}</Typography.Text>
    }

    // Group operations into work-center lanes.
    const lanes = new Map<string, {name: string; ops: ScheduledOperation[]}>()
    for (const op of operations) {
        const lane = lanes.get(op.workCenterUid) ?? {name: op.workCenterName || op.workCenterUid, ops: []}
        lane.ops.push(op)
        lanes.set(op.workCenterUid, lane)
    }

    const LABEL_W = 160
    const pct = (ms: number) => `${((ms - start) / span) * 100}%`
    const widthPct = (op: ScheduledOperation) => {
        const s = new Date(op.start).getTime()
        const e = new Date(op.end).getTime()
        return `${Math.max(0.5, ((e - s) / span) * 100)}%`
    }

    const fmt = (iso: string) => new Date(iso).toLocaleString([], {month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})

    return (
        <div style={{border: `1px solid ${token.colorBorderSecondary}`, backgroundColor: token.colorBgContainer}}>
            {/* Header: horizon range */}
            <Flex justify={"space-between"} style={{padding: "6px 12px", paddingLeft: LABEL_W + 12, borderBottom: `1px solid ${token.colorBorderSecondary}`}}>
                <Typography.Text type={"secondary"} style={{fontSize: 12}}>{fmt(horizonStart)}</Typography.Text>
                <Typography.Text type={"secondary"} style={{fontSize: 12}}>{fmt(horizonEnd)}</Typography.Text>
            </Flex>

            {[...lanes.entries()].map(([uid, lane]) => (
                <Flex key={uid} align={"center"} style={{borderBottom: `1px solid ${token.colorBorderSecondary}`, minHeight: 44}}>
                    <div style={{width: LABEL_W, flexShrink: 0, padding: "0 12px", fontSize: 13, fontWeight: 500}}>
                        {lane.name}
                    </div>
                    <div style={{position: "relative", flex: 1, height: 36}}>
                        {lane.ops.map((op, i) => (
                            <Tooltip
                                key={i}
                                title={
                                    <div>
                                        <div><b>{op.sku}</b> · {op.operationName}</div>
                                        <div>{t("Qty")}: {op.quantity}</div>
                                        <div>{fmt(op.start)} → {fmt(op.end)}</div>
                                        <div>{op.durationHours} h {op.late ? `· ${t("late")}` : ""}</div>
                                    </div>
                                }
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        left: pct(new Date(op.start).getTime()),
                                        width: widthPct(op),
                                        top: 6,
                                        height: 24,
                                        backgroundColor: op.late ? token.colorError : token.colorPrimary,
                                        color: "#fff",
                                        fontSize: 11,
                                        lineHeight: "24px",
                                        padding: "0 6px",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        borderRadius: 2,
                                        cursor: "default",
                                    }}
                                >
                                    {op.sku}
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                </Flex>
            ))}
        </div>
    )
}
