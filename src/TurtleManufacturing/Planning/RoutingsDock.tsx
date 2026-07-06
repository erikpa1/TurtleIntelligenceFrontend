import React from "react"
import {
    Button,
    Col,
    Divider,
    Empty,
    Flex,
    Form,
    Input,
    InputNumber,
    List,
    Popconfirm,
    Row,
    Select,
    Space,
    Splitter,
    Statistic,
    Table,
    Typography,
    message,
    theme as antdTheme,
} from "antd"
import type {ColumnsType} from "antd/es/table"
import {useTranslation} from "react-i18next"

import {SplitterWithHeader} from "@Turtle/Antd/Splitter"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"

import Routing, {RoutingOperation, newOperation} from "@TurtleManufacturing/Data/Routing"
import Item from "@TurtleManufacturing/Data/Item"
import WorkCenter from "@TurtleManufacturing/Data/WorkCenter"
import ItemsApi from "@TurtleManufacturing/Data/ItemsApi"
import {RoutingsApi, WorkCentersApi} from "@TurtleManufacturing/Data/PlanningApi"

// RoutingsDock defines the ordered operations required to manufacture a product,
// consumed by the APS scheduler.
export default function RoutingsDock() {
    const [t] = useTranslation()
    const {token} = antdTheme.useToken()
    const {bigPadding, theme} = useTurtleTheme()

    const [routings, setRoutings] = React.useState<Routing[]>([])
    const [items, setItems] = React.useState<Item[]>([])
    const [workCenters, setWorkCenters] = React.useState<WorkCenter[]>([])
    const [selected, setSelected] = React.useState<Routing | null>(null)

    async function refresh(): Promise<Routing[]> {
        const list = await RoutingsApi.List()
        setRoutings(list)
        return list
    }

    React.useEffect(() => {
        refresh()
        ItemsApi.List().then(setItems)
        WorkCentersApi.List().then(setWorkCenters)
    }, [])

    async function afterSave(saved: Routing) {
        const list = await refresh()
        setSelected(list.find((r) => r.code === saved.code) ?? saved)
    }

    async function afterDelete() {
        await refresh()
        setSelected(null)
    }

    const topbar = (
        <Flex align={"center"} style={{width: "100%", padding: "0 12px"}}>
            <Typography.Title level={4} style={{margin: 0}}>
                {t("Planning · Routings")}
            </Typography.Title>
        </Flex>
    )

    return (
        <SplitterWithHeader topbar={topbar}>
            <Splitter.Panel
                defaultSize={"28%"}
                min={"20%"}
                max={"45%"}
                style={{
                    backgroundColor: token.colorBgContainer,
                    padding: bigPadding,
                    height: theme.GetSplitterBigHeight(),
                }}
            >
                <Flex vertical gap={12} style={{height: "100%"}}>
                    <Button type={"primary"} block onClick={() => setSelected(new Routing())}>
                        {t("New routing")}
                    </Button>
                    <List
                        style={{overflow: "auto"}}
                        dataSource={routings}
                        locale={{emptyText: t("No routings yet")}}
                        renderItem={(r) => {
                            const active = selected?.uid === r.uid && !!r.uid
                            return (
                                <List.Item
                                    onClick={() => setSelected(r)}
                                    style={{
                                        cursor: "pointer",
                                        padding: "10px 12px",
                                        borderLeft: `3px solid ${active ? token.colorPrimary : "transparent"}`,
                                        backgroundColor: active ? token.colorFillTertiary : undefined,
                                    }}
                                >
                                    <List.Item.Meta
                                        title={r.code || t("(no code)")}
                                        description={
                                            <Typography.Text type={"secondary"}>
                                                {r.name} · {r.operations.length} {t("operations")}
                                            </Typography.Text>
                                        }
                                    />
                                </List.Item>
                            )
                        }}
                    />
                </Flex>
            </Splitter.Panel>

            <Splitter.Panel
                style={{
                    backgroundColor: token.colorBgLayout,
                    height: theme.GetSplitterBigHeight(),
                    overflow: "auto",
                }}
            >
                <RoutingEditor
                    routing={selected}
                    items={items}
                    workCenters={workCenters}
                    onSaved={afterSave}
                    onDeleted={afterDelete}
                />
            </Splitter.Panel>
        </SplitterWithHeader>
    )
}

interface RoutingEditorProps {
    routing: Routing | null
    items: Item[]
    workCenters: WorkCenter[]
    onSaved: (r: Routing) => void
    onDeleted: () => void
}

function RoutingEditor({routing, items, workCenters, onSaved, onDeleted}: RoutingEditorProps) {
    const [t] = useTranslation()
    const {token} = antdTheme.useToken()

    const draftRef = React.useRef<Routing>(new Routing())
    const [, setVersion] = React.useState(0)
    const bump = () => setVersion((v) => v + 1)

    React.useEffect(() => {
        const clone = new Routing()
        if (routing) clone.FromJson(routing.ToJson())
        draftRef.current = clone
        bump()
    }, [routing])

    const draft = draftRef.current
    const itemOptions = items.map((i) => ({value: i.uid, label: `${i.sku} · ${i.name}`}))
    const wcOptions = workCenters.map((w) => ({value: w.uid, label: `${w.code} · ${w.name}`}))

    if (!routing) {
        return (
            <Flex align={"center"} justify={"center"} style={{height: "100%"}}>
                <Empty description={t("Select a routing or create a new one")}/>
            </Flex>
        )
    }

    function setField<K extends keyof Routing>(key: K, value: Routing[K]) {
        ;(draft as any)[key] = value
        bump()
    }

    function onSelectProduct(uid: string) {
        draft.productUid = uid
        const it = items.find((i) => i.uid === uid)
        draft.productSku = it?.sku ?? ""
        if (!draft.name && it) draft.name = `${it.name} routing`
        bump()
    }

    function addOp() {
        draft.operations = [...draft.operations, newOperation()]
        bump()
    }

    function updateOp(index: number, patch: Partial<RoutingOperation>) {
        draft.operations = draft.operations.map((o, i) => (i === index ? {...o, ...patch} : o))
        bump()
    }

    function removeOp(index: number) {
        draft.operations = draft.operations.filter((_, i) => i !== index)
        bump()
    }

    async function save() {
        if (!draft.code.trim() || !draft.name.trim()) {
            message.error(t("Code and name are required"))
            return
        }
        await RoutingsApi.COU(draft)
        message.success(t("Routing saved"))
        onSaved(draft)
    }

    async function remove() {
        if (!draft.uid) return
        await RoutingsApi.Delete(draft.uid)
        message.success(t("Routing deleted"))
        onDeleted()
    }

    const columns: ColumnsType<RoutingOperation & {_index: number}> = [
        {title: t("Seq"), width: 50, render: (_, __, i) => i + 1},
        {
            title: t("Operation"),
            dataIndex: "name",
            render: (v, r) => (
                <Input value={v} placeholder={t("e.g. Cutting")}
                       onChange={(e) => updateOp(r._index, {name: e.target.value})}/>
            ),
        },
        {
            title: t("Work center"),
            dataIndex: "workCenterUid",
            width: 220,
            render: (uid, r) => (
                <Select
                    showSearch
                    style={{width: "100%"}}
                    placeholder={t("Select work center")}
                    value={uid || undefined}
                    options={wcOptions}
                    optionFilterProp={"label"}
                    onChange={(v) => {
                        const wc = workCenters.find((w) => w.uid === v)
                        updateOp(r._index, {workCenterUid: v, workCenterName: wc?.name ?? ""})
                    }}
                />
            ),
        },
        {
            title: t("Setup (min)"),
            dataIndex: "setupMinutes",
            width: 120,
            render: (v, r) => (
                <InputNumber min={0} style={{width: "100%"}} value={v}
                             onChange={(val) => updateOp(r._index, {setupMinutes: val ?? 0})}/>
            ),
        },
        {
            title: t("Run (min/unit)"),
            dataIndex: "runMinutesPerUnit",
            width: 140,
            render: (v, r) => (
                <InputNumber min={0} style={{width: "100%"}} value={v}
                             onChange={(val) => updateOp(r._index, {runMinutesPerUnit: val ?? 0})}/>
            ),
        },
        {
            title: "",
            width: 60,
            render: (_, r) => (
                <Popconfirm title={t("Remove operation?")} onConfirm={() => removeOp(r._index)}>
                    <Button size={"small"} danger type={"text"}>{t("Remove")}</Button>
                </Popconfirm>
            ),
        },
    ]

    const dataSource = draft.operations.map((o, i) => ({...o, _index: i, key: i}))
    const totalSetup = draft.operations.reduce((a, o) => a + o.setupMinutes, 0)
    const totalRun = draft.operations.reduce((a, o) => a + o.runMinutesPerUnit, 0)

    return (
        <Flex vertical style={{padding: 16, gap: 12}}>
            <Flex justify={"space-between"} align={"center"}>
                <Typography.Title level={4} style={{margin: 0}}>
                    {draft.code || t("New routing")}
                </Typography.Title>
                <Space>
                    {draft.uid && (
                        <Popconfirm title={t("Delete this routing?")} onConfirm={remove}>
                            <Button danger>{t("Delete")}</Button>
                        </Popconfirm>
                    )}
                    <Button type={"primary"} onClick={save}>{t("Save routing")}</Button>
                </Space>
            </Flex>

            <Form layout={"vertical"}>
                <Row gutter={12}>
                    <Col span={7}>
                        <Form.Item label={t("Code")} required>
                            <Input value={draft.code} placeholder={"RT-0001"}
                                   onChange={(e) => setField("code", e.target.value)}/>
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Form.Item label={t("Name")} required>
                            <Input value={draft.name} onChange={(e) => setField("name", e.target.value)}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={t("Product")}>
                            <Select showSearch allowClear optionFilterProp={"label"}
                                    placeholder={t("Select produced material")}
                                    value={draft.productUid || undefined} options={itemOptions}
                                    onChange={(v) => onSelectProduct(v ?? "")}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            <Divider titlePlacement={"start"} style={{margin: "4px 0"}}>{t("Operations")}</Divider>

            <Table columns={columns} dataSource={dataSource} pagination={false} size={"small"}
                   locale={{emptyText: t("No operations yet")}}/>

            <Button type={"dashed"} onClick={addOp} style={{alignSelf: "flex-start"}}>
                + {t("Add operation")}
            </Button>

            <Flex gap={32} style={{
                marginTop: 8, padding: "12px 16px",
                border: `1px solid ${token.colorBorderSecondary}`, backgroundColor: token.colorBgContainer,
            }}>
                <Statistic title={t("Operations")} value={draft.operations.length}/>
                <Statistic title={t("Total setup (min)")} value={totalSetup}/>
                <Statistic title={t("Total run (min/unit)")} value={totalRun}/>
            </Flex>
        </Flex>
    )
}
