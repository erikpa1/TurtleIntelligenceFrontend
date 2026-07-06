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
    Popconfirm,
    Row,
    Select,
    Space,
    Statistic,
    Table,
    Tag,
    Typography,
    message,
    theme as antdTheme,
} from "antd"
import type {ColumnsType} from "antd/es/table"
import {useTranslation} from "react-i18next"

import Bom, {BOM_STATUSES, BomComponent, newBomComponent} from "@TurtleManufacturing/Data/Bom"
import BomsApi from "@TurtleManufacturing/Data/BomsApi"
import Item, {ITEM_UOMS} from "@TurtleManufacturing/Data/Item"

const STATUS_COLORS: Record<string, string> = {
    draft: "default",
    active: "green",
    obsolete: "red",
}

interface BomEditorProps {
    bom: Bom | null
    items: Item[]
    onSaved: () => void
    onDeleted: () => void
}

// BomEditor edits a single bill of materials: the header (which product is
// produced, in what base quantity) and an editable components table.
export default function BomEditor({bom, items, onSaved, onDeleted}: BomEditorProps) {
    const [t] = useTranslation()
    const {token} = antdTheme.useToken()

    const draftRef = React.useRef<Bom>(new Bom())
    const [, setVersion] = React.useState(0)
    const [saving, setSaving] = React.useState(false)
    const bump = () => setVersion((v) => v + 1)

    React.useEffect(() => {
        const clone = new Bom()
        if (bom) clone.FromJson(bom.ToJson())
        draftRef.current = clone
        bump()
    }, [bom])

    const draft = draftRef.current

    const itemsMap = React.useMemo(() => new Map(items.map((i) => [i.uid, i])), [items])
    const itemOptions = React.useMemo(
        () => items.map((i) => ({value: i.uid, label: `${i.sku} · ${i.name}`})),
        [items],
    )

    if (!bom) {
        return (
            <Flex align={"center"} justify={"center"} style={{height: "100%"}}>
                <Empty description={t("Select a BOM or create a new one")}/>
            </Flex>
        )
    }

    function setField<K extends keyof Bom>(key: K, value: Bom[K]) {
        ;(draft as any)[key] = value
        bump()
    }

    function onSelectProduct(uid: string) {
        draft.productUid = uid
        const it = itemsMap.get(uid)
        if (it) {
            draft.productSku = it.sku
            if (!draft.name) draft.name = it.name
            draft.uom = it.uom
        }
        bump()
    }

    function addComponent() {
        draft.components = [...draft.components, newBomComponent()]
        bump()
    }

    function updateComponent(index: number, patch: Partial<BomComponent>) {
        draft.components = draft.components.map((c, i) => (i === index ? {...c, ...patch} : c))
        bump()
    }

    function onSelectComponentItem(index: number, uid: string) {
        const it = itemsMap.get(uid)
        updateComponent(index, {
            itemUid: uid,
            sku: it?.sku ?? "",
            name: it?.name ?? "",
            uom: it?.uom ?? "pcs",
        })
    }

    function removeComponent(index: number) {
        draft.components = draft.components.filter((_, i) => i !== index)
        bump()
    }

    function lineCost(c: BomComponent): number {
        const price = itemsMap.get(c.itemUid)?.unitPrice ?? 0
        return price * c.quantity * (1 + (c.scrapPct || 0) / 100)
    }

    const totalCost = draft.components.reduce((acc, c) => acc + lineCost(c), 0)
    const unitCost = draft.baseQuantity > 0 ? totalCost / draft.baseQuantity : totalCost
    const currency = items[0]?.currency ?? "EUR"

    async function save() {
        if (!draft.code.trim() || !draft.name.trim()) {
            message.error(t("Code and name are required"))
            return
        }
        setSaving(true)
        try {
            await BomsApi.COU(draft)
            message.success(t("BOM saved"))
            onSaved()
        } finally {
            setSaving(false)
        }
    }

    async function remove() {
        if (!draft.uid) return
        await BomsApi.Delete(draft.uid)
        message.success(t("BOM deleted"))
        onDeleted()
    }

    const columns: ColumnsType<BomComponent & {_index: number}> = [
        {
            title: "#",
            width: 44,
            render: (_, __, i) => i + 1,
        },
        {
            title: t("Component"),
            dataIndex: "itemUid",
            render: (uid, r) => (
                <Select
                    showSearch
                    style={{width: "100%", minWidth: 220}}
                    placeholder={t("Select material")}
                    value={uid || undefined}
                    options={itemOptions}
                    optionFilterProp={"label"}
                    onChange={(v) => onSelectComponentItem(r._index, v)}
                />
            ),
        },
        {
            title: t("Quantity"),
            dataIndex: "quantity",
            width: 120,
            render: (v, r) => (
                <InputNumber
                    min={0}
                    style={{width: "100%"}}
                    value={v}
                    onChange={(val) => updateComponent(r._index, {quantity: val ?? 0})}
                />
            ),
        },
        {
            title: t("UoM"),
            dataIndex: "uom",
            width: 90,
            render: (v, r) => (
                <Select
                    style={{width: "100%"}}
                    value={v}
                    options={ITEM_UOMS.map((u) => ({value: u, label: u}))}
                    onChange={(val) => updateComponent(r._index, {uom: val})}
                />
            ),
        },
        {
            title: t("Scrap %"),
            dataIndex: "scrapPct",
            width: 100,
            render: (v, r) => (
                <InputNumber
                    min={0}
                    max={100}
                    style={{width: "100%"}}
                    value={v}
                    onChange={(val) => updateComponent(r._index, {scrapPct: val ?? 0})}
                />
            ),
        },
        {
            title: t("Line cost"),
            width: 120,
            align: "right",
            render: (_, r) => `${lineCost(r).toFixed(2)} ${currency}`,
        },
        {
            title: "",
            width: 60,
            render: (_, r) => (
                <Popconfirm title={t("Remove component?")} onConfirm={() => removeComponent(r._index)}>
                    <Button size={"small"} danger type={"text"}>
                        {t("Remove")}
                    </Button>
                </Popconfirm>
            ),
        },
    ]

    const dataSource = draft.components.map((c, i) => ({...c, _index: i, key: i}))

    return (
        <Flex vertical style={{padding: 16, gap: 12}}>
            <Flex justify={"space-between"} align={"center"}>
                <Space align={"center"}>
                    <Typography.Title level={4} style={{margin: 0}}>
                        {draft.code || t("New BOM")}
                    </Typography.Title>
                    <Tag color={STATUS_COLORS[draft.status] ?? "default"}>
                        {t(`bom.status.${draft.status}`)}
                    </Tag>
                </Space>
                <Space>
                    {draft.uid && (
                        <Popconfirm title={t("Delete this BOM?")} onConfirm={remove}>
                            <Button danger>{t("Delete")}</Button>
                        </Popconfirm>
                    )}
                    <Button type={"primary"} loading={saving} onClick={save}>
                        {t("Save BOM")}
                    </Button>
                </Space>
            </Flex>

            <Form layout={"vertical"}>
                <Row gutter={12}>
                    <Col span={8}>
                        <Form.Item label={t("BOM code")} required>
                            <Input
                                value={draft.code}
                                placeholder={"BOM-0001"}
                                onChange={(e) => setField("code", e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item label={t("Name")} required>
                            <Input
                                value={draft.name}
                                onChange={(e) => setField("name", e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label={t("Status")}>
                            <Select
                                value={draft.status}
                                options={BOM_STATUSES.map((s) => ({value: s, label: t(`bom.status.${s}`)}))}
                                onChange={(v) => setField("status", v)}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={10}>
                        <Form.Item label={t("Product (finished item)")}>
                            <Select
                                showSearch
                                allowClear
                                placeholder={t("Select produced material")}
                                value={draft.productUid || undefined}
                                options={itemOptions}
                                optionFilterProp={"label"}
                                onChange={(v) => onSelectProduct(v ?? "")}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label={t("Base quantity")}>
                            <InputNumber
                                min={0}
                                style={{width: "100%"}}
                                value={draft.baseQuantity}
                                onChange={(v) => setField("baseQuantity", v ?? 0)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label={t("UoM")}>
                            <Select
                                value={draft.uom}
                                options={ITEM_UOMS.map((u) => ({value: u, label: u}))}
                                onChange={(v) => setField("uom", v)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label={t("Version")}>
                            <Input
                                value={draft.version}
                                onChange={(e) => setField("version", e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label={t("Description")}>
                    <Input.TextArea
                        rows={2}
                        value={draft.description}
                        onChange={(e) => setField("description", e.target.value)}
                    />
                </Form.Item>
            </Form>

            <Divider style={{margin: "4px 0"}} titlePlacement={"start"}>
                {t("Components")}
            </Divider>

            <Table
                size={"small"}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                locale={{emptyText: t("No components yet")}}
            />

            <Button type={"dashed"} onClick={addComponent} style={{alignSelf: "flex-start"}}>
                + {t("Add component")}
            </Button>

            <Flex
                gap={32}
                style={{
                    marginTop: 8,
                    padding: "12px 16px",
                    border: `1px solid ${token.colorBorderSecondary}`,
                    backgroundColor: token.colorBgContainer,
                }}
            >
                <Statistic title={t("Components")} value={draft.components.length}/>
                <Statistic
                    title={t("Total material cost")}
                    value={totalCost}
                    precision={2}
                    suffix={currency}
                />
                <Statistic
                    title={t("Cost per unit")}
                    value={unitCost}
                    precision={2}
                    suffix={currency}
                />
            </Flex>
        </Flex>
    )
}
