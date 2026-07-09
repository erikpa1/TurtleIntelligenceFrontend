import React from "react";
import {useTranslation} from "react-i18next";
import {Table, TableProps, Tag, Tooltip, Typography} from "antd";
import dayjs from "dayjs";
import {HierarchyDeleteButton} from "@Turtle/Components/HierarchyComponents";
import PointCloudEntry, {PointCloudStatus} from "./PointCloudEntry";
import PointCloudApi from "./PointCloudApi";

interface PointCloudListProps {
    clouds: Array<PointCloudEntry>
    selectedUid: string
    onSelect: (uid: string) => void
    onChanged: () => void
}

function formatPoints(count: number): string {
    if (count >= 1_000_000) {
        return `${(count / 1_000_000).toFixed(1)}M`
    }
    if (count >= 1_000) {
        return `${(count / 1_000).toFixed(1)}K`
    }
    return `${count}`
}

function statusTag(status: PointCloudStatus, error: string, t: (key: string) => string) {
    if (status === "ready") {
        return <Tag color={"green"}>{t("ready")}</Tag>
    }
    if (status === "error") {
        return (
            <Tooltip title={error}>
                <Tag color={"red"}>{t("error")}</Tag>
            </Tooltip>
        )
    }
    return <Tag color={"blue"}>{t("processing")}</Tag>
}

export default function PointCloudList({clouds, selectedUid, onSelect, onChanged}: PointCloudListProps) {

    const [t] = useTranslation()

    async function deleteCloud(uid: string) {
        await PointCloudApi.DeleteCloud(uid)
        onChanged()
    }

    const columns: TableProps<PointCloudEntry>['columns'] = [
        {
            title: t("name"),
            dataIndex: "name",
            key: "name",
            render: (name, entry) => (
                <Typography.Text strong={entry.uid === selectedUid}>
                    {name}
                </Typography.Text>
            )
        },
        {
            title: t("status"),
            key: "status",
            width: 100,
            render: (_, entry) => statusTag(entry.status, entry.error, t)
        },
        {
            title: t("points"),
            key: "points",
            width: 80,
            render: (_, entry) => entry.status === "ready" ? formatPoints(entry.totalPoints) : "-"
        },
        {
            title: t("created"),
            dataIndex: "created",
            key: "created",
            width: 150,
            render: (created) => created ? dayjs(created).format("YYYY-MM-DD HH:mm") : ""
        },
        {
            title: t("actions"),
            key: "actions",
            width: 50,
            render: (_, entry) => (
                <HierarchyDeleteButton onClick={() => deleteCloud(entry.uid)}/>
            )
        }
    ]

    return (
        <Table
            rowKey={"uid"}
            pagination={false}
            bordered
            size={"small"}
            dataSource={clouds}
            columns={columns}
            locale={{emptyText: t("no.point.clouds")}}
            onRow={(entry) => ({
                onClick: () => onSelect(entry.uid),
                style: {
                    cursor: "pointer",
                    backgroundColor: entry.uid === selectedUid ? "#e6f4ff" : undefined
                }
            })}
        />
    )
}
