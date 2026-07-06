import React from "react"
import {
    Button,
    Col,
    DatePicker,
    Drawer,
    Flex,
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Typography,
    message,
    theme as antdTheme,
} from "antd"
import type {ColumnsType} from "antd/es/table"
import {useTranslation} from "react-i18next"
import dayjs from "dayjs"

import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"
import Demand, {DEMAND_STATUSES, DEMAND_TYPES} from "@TurtleManufacturing/Data/Demand"
import Item from "@TurtleManufacturing/Data/Item"
import ItemsApi from "@TurtleManufacturing/Data/ItemsApi"
import {DemandApi} from "@TurtleManufacturing/Data/PlanningApi"

const STATUS_COLORS: Record<string, string> = {open: "blue", released: "gold", closed: "default"}

// DemandDock manages independent demand (sales orders / forecast) that feeds MRP.
export default function DemandDock() {
    const [t] = useTranslation()
    const {token} = antdTheme.useToken()
    const {bigPadding, theme} = useTurtleTheme()

    const [rows, setRows] = React.useState<Demand[]>([])
    const [items, setItems] = React.useState<Item[]>([])
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [editing, setEditing] = React.useState<Demand | null>(null)
    const [form] = Form.useForm()

    async function refresh() {
        setLoading(true)
        try {
            setRows(await DemandApi.List())
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        refresh()
        ItemsApi.List().then(setItems)
    }, [])

    const itemOptions = items.map((i) => ({value: i.uid, label: `${i.sku} · ${i.name}`}))

    function openEditor(d: Demand | null) {
        const base = d ?? new Demand()
        setEditing(d)
        setOpen(true)
        form.setFieldsValue({
            ...base,
            dueDate: base.dueDate ? dayjs(base.dueDate) : undefined,
        })
    }

    async function submit() {
        const values = await form.validateFields()
        const entity = new Demand()
        entity.FromJson({...(editing ? editing.ToJson() : {}), ...values})
        entity.uid = editing?.uid ?? ""
        entity.dueDate = values.dueDate ? values.dueDate.format("YYYY-MM-DD") : ""
        const product = items.find((i) => i.uid === values.productUid)
        entity.productSku = product?.sku ?? ""
        entity.uom = product?.uom ?? entity.uom
        await DemandApi.COU(entity)
        message.success(t("Demand saved"))
        setOpen(false)
        refresh()
    }

    async function remove(d: Demand) {
        await DemandApi.Delete(d.uid)
        message.success(t("Demand deleted"))
        refresh()
    }

    const columns: ColumnsType<Demand> = [
        {title: t("Reference"), dataIndex: "reference", render: (v) => <Typography.Text strong>{v}</Typography.Text>},
        {
            title: t("Product"),
            dataIndex: "productUid",
            render: (uid, r) => {
                const it = items.find((i) => i.uid === uid)
                return it ? `${it.sku} · ${it.name}` : r.productSku || "—"
            },
        },
        {title: t("Quantity"), dataIndex: "quantity", width: 110, align: "right", render: (v, r) => `${v} ${r.uom}`},
        {
            title: t("Due date"),
            dataIndex: "dueDate",
            width: 130,
            sorter: (a, b) => a.dueDate.localeCompare(b.dueDate),
        },
        {
            title: t("Type"),
            dataIndex: "demandType",
            width: 110,
            render: (v) => <Tag>{t(`demand.type.${v}`)}</Tag>,
        },
        {
            title: t("Status"),
            dataIndex: "status",
            width: 110,
            render: (v) => <Tag color={STATUS_COLORS[v] ?? "default"}>{t(`demand.status.${v}`)}</Tag>,
        },
        {
            title: t("Actions"),
            key: "actions",
            width: 130,
            render: (_, r) => (
                <Space>
                    <Button size={"small"} onClick={() => openEditor(r)}>{t("Edit")}</Button>
                    <Popconfirm title={t("Delete demand?")} onConfirm={() => remove(r)}>
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
                    {t("Planning · Demand")}
                </Typography.Title>
                <Button type={"primary"} onClick={() => openEditor(null)}>{t("New demand")}</Button>
            </Flex>

            <Table<Demand>
                rowKey={"uid"}
                size={"middle"}
                loading={loading}
                columns={columns}
                dataSource={rows}
                pagination={{pageSize: 20}}
            />

            <Drawer
                title={editing?.uid ? t("Edit demand") : t("New demand")}
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
                    <Form.Item name={"reference"} label={t("Reference")}
                               rules={[{required: true, message: t("Reference is required")}]}>
                        <Input placeholder={"SO-1001"}/>
                    </Form.Item>
                    <Form.Item name={"productUid"} label={t("Product")}
                               rules={[{required: true, message: t("Product is required")}]}>
                        <Select showSearch optionFilterProp={"label"} options={itemOptions}
                                placeholder={t("Select material")}/>
                    </Form.Item>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item name={"quantity"} label={t("Quantity")}>
                                <InputNumber style={{width: "100%"}} min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name={"dueDate"} label={t("Due date")}
                                       rules={[{required: true, message: t("Due date is required")}]}>
                                <DatePicker style={{width: "100%"}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item name={"demandType"} label={t("Type")}>
                                <Select options={DEMAND_TYPES.map((d) => ({value: d, label: t(`demand.type.${d}`)}))}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name={"status"} label={t("Status")}>
                                <Select options={DEMAND_STATUSES.map((s) => ({value: s, label: t(`demand.status.${s}`)}))}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </Flex>
    )
}
