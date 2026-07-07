import React from "react";
import {
    Badge,
    Button,
    Flex,
    Input,
    Popconfirm,
    Space,
    Statistic,
    Table,
    Tag,
    Tooltip,
    Typography,
    message,
    theme as antdTheme,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

import { useTurtleTheme } from "@Turtle/Theme/useTurleTheme";
import Item from "@TurtleManufacturing/Data/Item";
import ItemsApi from "@TurtleManufacturing/Data/ItemsApi";
import COUItemDrawer from "@TurtleManufacturing/Inventory/COUItemDrawer";
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import { HierarchyRightFlex } from "@Turtle/Components/HierarchyComponents";

const CATEGORY_COLORS: Record<string, string> = {
    raw: "blue",
    semiFinished: "gold",
    finished: "green",
    trading: "purple",
};

// InventoryDock is the material master list, styled after an SAP inventory
// screen: a KPI header, a searchable material table and a drawer editor.
export default function InventoryDock() {
    const [t] = useTranslation();
    const { token } = antdTheme.useToken();
    const { bigPadding, theme } = useTurtleTheme();

    const [items, setItems] = React.useState<Item[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [editing, setEditing] = React.useState<Item | null>(null);

    async function refresh() {
        setLoading(true);
        try {
            setItems(await ItemsApi.List());
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        refresh();
    }, []);

    function openCreate() {
        setEditing(new Item());
        setDrawerOpen(true);
    }

    function openEdit(item: Item) {
        setEditing(item);
        setDrawerOpen(true);
    }

    async function remove(item: Item) {
        await ItemsApi.Delete(item.uid);
        message.success(t("Material deleted"));
        refresh();
    }

    const filtered = React.useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return items;
        return items.filter(
            (i) =>
                i.sku.toLowerCase().includes(q) ||
                i.name.toLowerCase().includes(q) ||
                i.warehouse.toLowerCase().includes(q),
        );
    }, [items, search]);

    const stockValue = items.reduce(
        (acc, i) => acc + i.unitPrice * i.qtyOnHand,
        0,
    );
    const lowStock = items.filter(
        (i) => i.reorderPoint > 0 && i.qtyOnHand <= i.reorderPoint,
    ).length;

    const columns: ColumnsType<Item> = [
        {
            title: t("SKU"),
            dataIndex: "sku",
            width: 140,
            sorter: (a, b) => a.sku.localeCompare(b.sku),
            render: (v) => <Typography.Text strong>{v}</Typography.Text>,
        },
        {
            title: t("Name"),
            dataIndex: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: t("Category"),
            dataIndex: "category",
            width: 130,
            filters: Object.keys(CATEGORY_COLORS).map((c) => ({
                text: t(`item.category.${c}`),
                value: c,
            })),
            onFilter: (val, r) => r.category === val,
            render: (c) => (
                <Tag color={CATEGORY_COLORS[c] ?? "default"}>
                    {t(`item.category.${c}`)}
                </Tag>
            ),
        },
        { title: t("UoM"), dataIndex: "uom", width: 80 },
        {
            title: t("Unit price"),
            dataIndex: "unitPrice",
            width: 130,
            align: "right",
            sorter: (a, b) => a.unitPrice - b.unitPrice,
            render: (v, r) => `${Number(v).toFixed(2)} ${r.currency}`,
        },
        {
            title: t("On hand"),
            dataIndex: "qtyOnHand",
            width: 130,
            align: "right",
            sorter: (a, b) => a.qtyOnHand - b.qtyOnHand,
            render: (v, r) => {
                const low = r.reorderPoint > 0 && v <= r.reorderPoint;
                return (
                    <Tooltip title={low ? t("Below reorder point") : ""}>
                        <Typography.Text type={low ? "danger" : undefined}>
                            {v} {r.uom}
                        </Typography.Text>
                    </Tooltip>
                );
            },
        },
        { title: t("Warehouse"), dataIndex: "warehouse", width: 130 },
        {
            title: t("Status"),
            dataIndex: "active",
            width: 110,
            render: (active) =>
                active ? (
                    <Badge status={"success"} text={t("Active")} />
                ) : (
                    <Badge status={"default"} text={t("Inactive")} />
                ),
        },
        {
            title: t("Actions"),
            key: "actions",
            width: 130,
            render: (_, r) => (
                <Space>
                    <Button
                        type="text"
                        size={"small"}
                        onClick={() => openEdit(r)}
                    >
                        {t("Edit")}
                    </Button>
                    <Popconfirm
                        title={t("Delete material?")}
                        onConfirm={() => remove(r)}
                        okText={t("Delete")}
                        cancelText={t("Cancel")}
                    >
                        <Button size={"small"} danger>
                            {t("delete")}
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <TopBarWrapper>
                <Typography.Title level={4} style={{ margin: 0 }}>
                    {t("Inventory · Materials")}
                </Typography.Title>

                <HierarchyRightFlex>
                    <Button type={"primary"} onClick={openCreate}>
                        {t("create.material")}
                    </Button>
                </HierarchyRightFlex>
            </TopBarWrapper>

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
                <Flex gap={16} wrap>
                    <_StatCard>
                        <Statistic
                            title={t("Materials")}
                            value={items.length}
                        />
                    </_StatCard>
                    <_StatCard>
                        <Statistic
                            title={t("Stock value")}
                            value={stockValue}
                            precision={2}
                            suffix={items[0]?.currency ?? "EUR"}
                        />
                    </_StatCard>
                    <_StatCard>
                        <Statistic
                            title={t("Below reorder point")}
                            value={lowStock}
                            valueStyle={{
                                color:
                                    lowStock > 0 ? token.colorError : undefined,
                            }}
                        />
                    </_StatCard>
                </Flex>

                <Input.Search
                    allowClear
                    placeholder={t("Search by SKU, name or warehouse")}
                    style={{ maxWidth: 360 }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Table<Item>
                    rowKey={"uid"}
                    size={"middle"}
                    loading={loading}
                    columns={columns}
                    dataSource={filtered}
                    pagination={{ pageSize: 20, showSizeChanger: true }}
                    scroll={{ x: 1000 }}
                />

                <COUItemDrawer
                    open={drawerOpen}
                    item={editing}
                    onClose={() => setDrawerOpen(false)}
                    onSaved={refresh}
                />
            </Flex>
        </>
    );
}

function _StatCard({ children }: { children: React.ReactNode }) {
    const { token } = antdTheme.useToken();
    return (
        <div
            style={{
                minWidth: 180,
                padding: "12px 20px",
                border: `1px solid ${token.colorBorderSecondary}`,
                backgroundColor: token.colorBgContainer,
            }}
        >
            {children}
        </div>
    );
}
