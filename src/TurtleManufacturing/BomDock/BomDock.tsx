import React from "react"
import {Button, Flex, Input, List, Splitter, Tag, Typography, theme as antdTheme} from "antd"
import {useNavigate, useParams} from "react-router-dom"
import {useTranslation} from "react-i18next"

import {SplitterWithHeader} from "@Turtle/Antd/Splitter"
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme"

import Bom from "@TurtleManufacturing/Data/Bom"
import BomsApi from "@TurtleManufacturing/Data/BomsApi"
import Item from "@TurtleManufacturing/Data/Item"
import ItemsApi from "@TurtleManufacturing/Data/ItemsApi"
import BomEditor from "@TurtleManufacturing/BomDock/BomEditor"

const STATUS_COLORS: Record<string, string> = {
    draft: "default",
    active: "green",
    obsolete: "red",
}

// BomDock is the manufacturing Bill of Materials workspace: a master list of
// BOMs on the left and a full editor (header + components) on the right.
export default function BomDock() {
    const [t] = useTranslation()
    const navigate = useNavigate()
    const {bomUid} = useParams()
    const {token} = antdTheme.useToken()
    const {bigPadding, theme} = useTurtleTheme()

    const [boms, setBoms] = React.useState<Bom[]>([])
    const [items, setItems] = React.useState<Item[]>([])
    const [search, setSearch] = React.useState("")
    const [selected, setSelected] = React.useState<Bom | null>(null)

    async function refreshBoms(): Promise<Bom[]> {
        const list = await BomsApi.List()
        setBoms(list)
        return list
    }

    React.useEffect(() => {
        refreshBoms()
        ItemsApi.List().then(setItems)
    }, [])

    // Keep the selection in sync with the route param.
    React.useEffect(() => {
        if (!bomUid) {
            setSelected(null)
            return
        }
        const found = boms.find((b) => b.uid === bomUid)
        if (found) setSelected(found)
    }, [bomUid, boms])

    function selectBom(b: Bom) {
        navigate(`/manufacturing/bom/${b.uid}`)
        setSelected(b)
    }

    function createBom() {
        navigate(`/manufacturing/bom`)
        setSelected(new Bom())
    }

    async function afterSave() {
        const list = await refreshBoms()
        // Re-point selection to the freshly persisted record when possible.
        if (selected?.uid) {
            setSelected(list.find((b) => b.uid === selected.uid) ?? selected)
        } else {
            navigate(`/manufacturing/bom`)
            setSelected(null)
        }
    }

    async function afterDelete() {
        await refreshBoms()
        navigate(`/manufacturing/bom`)
        setSelected(null)
    }

    const filtered = React.useMemo(() => {
        const q = search.trim().toLowerCase()
        if (!q) return boms
        return boms.filter(
            (b) => b.code.toLowerCase().includes(q) || b.name.toLowerCase().includes(q),
        )
    }, [boms, search])

    const topbar = (
        <Flex align={"center"} justify={"space-between"} style={{width: "100%", padding: "0 12px"}}>
            <Typography.Title level={4} style={{margin: 0}}>
                {t("Manufacturing · Bill of Materials")}
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
                    <Button type={"primary"} block onClick={createBom}>
                        {t("New BOM")}
                    </Button>
                    <Input.Search
                        allowClear
                        placeholder={t("Search BOMs")}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <List
                        style={{overflow: "auto"}}
                        dataSource={filtered}
                        locale={{emptyText: t("No BOMs yet")}}
                        renderItem={(b) => {
                            const active = selected?.uid === b.uid && !!b.uid
                            return (
                                <List.Item
                                    onClick={() => selectBom(b)}
                                    style={{
                                        cursor: "pointer",
                                        padding: "10px 12px",
                                        borderLeft: `3px solid ${
                                            active ? token.colorPrimary : "transparent"
                                        }`,
                                        backgroundColor: active ? token.colorFillTertiary : undefined,
                                    }}
                                >
                                    <List.Item.Meta
                                        title={
                                            <Flex justify={"space-between"} align={"center"} gap={8}>
                                                <span>{b.code || t("(no code)")}</span>
                                                <Tag color={STATUS_COLORS[b.status] ?? "default"}>
                                                    {t(`bom.status.${b.status}`)}
                                                </Tag>
                                            </Flex>
                                        }
                                        description={
                                            <Typography.Text type={"secondary"} ellipsis>
                                                {b.name}
                                                {b.version ? ` · v${b.version}` : ""}
                                                {` · ${b.components.length} ${t("components")}`}
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
                <BomEditor
                    bom={selected}
                    items={items}
                    onSaved={afterSave}
                    onDeleted={afterDelete}
                />
            </Splitter.Panel>
        </SplitterWithHeader>
    )
}
