import React from "react"
import {Button, Col, Divider, Drawer, Flex, Form, Input, InputNumber, Row, Select, Space, Switch, message} from "antd"
import {useTranslation} from "react-i18next"

import Item, {ITEM_CATEGORIES, ITEM_UOMS, PROCUREMENT_TYPES} from "@TurtleManufacturing/Data/Item"
import ItemsApi from "@TurtleManufacturing/Data/ItemsApi"

interface COUItemDrawerProps {
    open: boolean
    item: Item | null
    onClose: () => void
    onSaved: () => void
}

// COUItemDrawer is the create/update form for an inventory material, presented
// in a right-hand drawer in the spirit of an SAP material master screen.
export default function COUItemDrawer({open, item, onClose, onSaved}: COUItemDrawerProps) {
    const [t] = useTranslation()
    const [form] = Form.useForm()
    const [saving, setSaving] = React.useState(false)

    const isEdit = !!item && !!item.uid

    React.useEffect(() => {
        if (open) {
            const base = item ?? new Item()
            form.setFieldsValue({...base})
        }
    }, [open, item])

    async function submit() {
        const values = await form.validateFields()
        const entity = new Item()
        entity.FromJson({...(item ? item.ToJson() : {}), ...values})
        // FromJson coerces missing fields; make sure edits to uid are preserved.
        entity.uid = item?.uid ?? ""

        setSaving(true)
        try {
            await ItemsApi.COU(entity)
            message.success(t(isEdit ? "Material updated" : "Material created"))
            onSaved()
            onClose()
        } finally {
            setSaving(false)
        }
    }

    return (
        <Drawer
            title={t(isEdit ? "Edit material" : "New material")}
            width={520}
            open={open}
            onClose={onClose}
            destroyOnHidden
            extra={
                <Space>
                    <Button onClick={onClose}>{t("Cancel")}</Button>
                    <Button type={"primary"} loading={saving} onClick={submit}>
                        {t("Save")}
                    </Button>
                </Space>
            }
        >
            <Form form={form} layout={"vertical"} requiredMark={"optional"}>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item
                            name={"sku"}
                            label={t("SKU / Material no.")}
                            rules={[{required: true, message: t("SKU is required")}]}
                        >
                            <Input placeholder={"RAW-0001"}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={"type"} label={t("Type")}>
                            <Input placeholder={"Material"}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name={"name"}
                    label={t("Name")}
                    rules={[{required: true, message: t("Name is required")}]}
                >
                    <Input placeholder={t("Material name")}/>
                </Form.Item>

                <Form.Item name={"description"} label={t("Description")}>
                    <Input.TextArea rows={2}/>
                </Form.Item>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item name={"category"} label={t("Category")}>
                            <Select
                                options={ITEM_CATEGORIES.map((c) => ({value: c, label: t(`item.category.${c}`)}))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={"uom"} label={t("Unit of measure")}>
                            <Select
                                showSearch
                                options={ITEM_UOMS.map((u) => ({value: u, label: u}))}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item name={"unitPrice"} label={t("Unit price")}>
                            <InputNumber style={{width: "100%"}} min={0} step={0.01}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={"currency"} label={t("Currency")}>
                            <Select
                                options={["EUR", "USD", "GBP", "CZK"].map((c) => ({value: c, label: c}))}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item name={"qtyOnHand"} label={t("Quantity on hand")}>
                            <InputNumber style={{width: "100%"}} min={0}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={"reorderPoint"} label={t("Reorder point")}>
                            <InputNumber style={{width: "100%"}} min={0}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item name={"warehouse"} label={t("Warehouse / Plant")}>
                            <Input placeholder={"WH-01"}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={"active"} label={t("Active")} valuePropName={"checked"}>
                            <Switch/>
                        </Form.Item>
                    </Col>
                </Row>

                <Divider titlePlacement={"start"}>{t("MRP / Planning")}</Divider>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item
                            name={"procurementType"}
                            label={t("Procurement type")}
                            tooltip={t("Make = produced via BOM, Buy = purchased externally")}
                        >
                            <Select
                                options={PROCUREMENT_TYPES.map((p) => ({
                                    value: p,
                                    label: t(`procurement.${p}`),
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={"leadTimeDays"} label={t("Lead time (days)")}>
                            <InputNumber style={{width: "100%"}} min={0}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={8}>
                        <Form.Item name={"safetyStock"} label={t("Safety stock")}>
                            <InputNumber style={{width: "100%"}} min={0}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name={"lotSize"}
                            label={t("Lot size")}
                            tooltip={t("0 = lot-for-lot (order exact net requirement)")}
                        >
                            <InputNumber style={{width: "100%"}} min={0}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name={"minLotSize"} label={t("Min lot size")}>
                            <InputNumber style={{width: "100%"}} min={0}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}
