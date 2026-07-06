import React from "react"
import {
    Badge,
    Button,
    Col,
    Drawer,
    Flex,
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Row,
    Space,
    Switch,
    Table,
    Typography,
    message,
    theme as antdTheme,
} from "antd"
import type {ColumnsType} from "antd/es/table"
import {useTranslation} from "react-i18next"

import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import WorkCenter from "@TurtleManufacturing/Data/WorkCenter"
import {WorkCentersApi} from "@TurtleManufacturing/Data/PlanningApi"

// WorkCentersDock manages the finite-capacity resources used by the APS scheduler.
export default function WorkCentersDock() {
    const [t] = useTranslation()
    const {token} = antdTheme.useToken()
    const {bigPadding, theme} = useTurtleTheme()

    const [rows, setRows] = React.useState<WorkCenter[]>([])
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [editing, setEditing] = React.useState<WorkCenter | null>(null)
    const [form] = Form.useForm()

    async function refresh() {
        setLoading(true)
        try {
            setRows(await WorkCentersApi.List())
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        refresh()
    }, [])

    function openEditor(w: WorkCenter | null) {
        setEditing(w)
        setOpen(true)
        form.setFieldsValue({...(w ?? new WorkCenter())})
    }

    async function submit() {
        const values = await form.validateFields()
        const entity = new WorkCenter()
        entity.FromJson({...(editing ? editing.ToJson() : {}), ...values})
        entity.uid = editing?.uid ?? ""
        await WorkCentersApi.COU(entity)
        message.success(t("Work center saved"))
        setOpen(false)
        refresh()
    }

    async function remove(w: WorkCenter) {
        await WorkCentersApi.Delete(w.uid)
        message.success(t("Work center deleted"))
        refresh()
    }

    const columns: ColumnsType<WorkCenter> = [
        {title: t("Code"), dataIndex: "code", width: 120, render: (v) => <Typography.Text strong>{v}</Typography.Text>},
        {title: t("Name"), dataIndex: "name"},
        {title: t("Capacity (h/day)"), dataIndex: "capacityHoursPerDay", width: 150, align: "right"},
        {title: t("Efficiency %"), dataIndex: "efficiency", width: 130, align: "right"},
        {
            title: t("Cost / h"),
            dataIndex: "costPerHour",
            width: 120,
            align: "right",
            render: (v) => Number(v).toFixed(2),
        },
        {
            title: t("Status"),
            dataIndex: "active",
            width: 110,
            render: (a) => <Badge status={a ? "success" : "default"} text={a ? t("Active") : t("Inactive")}/>,
        },
        {
            title: t("Actions"),
            key: "actions",
            width: 130,
            render: (_, r) => (
                <Space>
                    <Button size={"small"} onClick={() => openEditor(r)}>{t("Edit")}</Button>
                    <Popconfirm title={t("Delete work center?")} onConfirm={() => remove(r)}>
                        <Button size={"small"} danger>{t("Delete")}</Button>
                    </Popconfirm>
                </Space>
            ),
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
            <Flex justify={"space-between"} align={"center"}>
                <Typography.Title level={3} style={{margin: 0}}>
                    {t("Planning · Work centers")}
                </Typography.Title>
                <Button type={"primary"} onClick={() => openEditor(null)}>{t("New work center")}</Button>
            </Flex>

            <Table<WorkCenter>
                rowKey={"uid"}
                size={"middle"}
                loading={loading}
                columns={columns}
                dataSource={rows}
                pagination={{pageSize: 20}}
            />

            <Drawer
                title={editing?.uid ? t("Edit work center") : t("New work center")}
                width={480}
                open={open}
                onClose={() => setOpen(false)}
                destroyOnHidden
                extra={
                    <Space>
                        <Button onClick={() => setOpen(false)}>{t("Cancel")}</Button>
                        <Button type={"primary"} onClick={submit}>{t("Save")}</Button>
                    </Space>
                }
            >
                <Form form={form} layout={"vertical"} requiredMark={"optional"}>
                    <Row gutter={12}>
                        <Col span={10}>
                            <Form.Item name={"code"} label={t("Code")}
                                       rules={[{required: true, message: t("Code is required")}]}>
                                <Input placeholder={"WC-01"}/>
                            </Form.Item>
                        </Col>
                        <Col span={14}>
                            <Form.Item name={"name"} label={t("Name")}
                                       rules={[{required: true, message: t("Name is required")}]}>
                                <Input placeholder={t("Assembly line 1")}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name={"description"} label={t("Description")}>
                        <Input.TextArea rows={2}/>
                    </Form.Item>
                    <Row gutter={12}>
                        <Col span={8}>
                            <Form.Item name={"capacityHoursPerDay"} label={t("Capacity (h/day)")}>
                                <InputNumber style={{width: "100%"}} min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name={"efficiency"} label={t("Efficiency %")}>
                                <InputNumber style={{width: "100%"}} min={1}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name={"costPerHour"} label={t("Cost / h")}>
                                <InputNumber style={{width: "100%"}} min={0}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name={"active"} label={t("Active")} valuePropName={"checked"}>
                        <Switch/>
                    </Form.Item>
                </Form>
            </Drawer>
        </Flex>
    )
}
