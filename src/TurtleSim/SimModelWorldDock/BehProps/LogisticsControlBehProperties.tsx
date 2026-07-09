import React from "react";
import {Button, Divider, Form, List, Modal, Segmented, Select, Space, Typography} from "antd";
import {EditOutlined, FormatPainterOutlined, MoreOutlined, ThunderboltOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";
import SimTable, {SimTableColumn, useWorldEntities} from "@TurtleSim/SimModelWorldDock/Components/SimTable";
import SimTableEditor, {TABLE_COLUMNS, TABLE_ROWS} from "@TurtleSim/SimModelWorldDock/Components/SimTableEditor";
import WorldEntitySelect from "@TurtleSim/SimModelWorldDock/Components/WorldEntitySelect";
import SimFactory from "@TurtleSim/Factories/SimFactory";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";

interface LogisticsControlBehPropertiesProps {
    entity: SimEntity;
}

/**
 * typeData keys read on the backend (behLogisticsControl_impl.go).
 * Embedded mode uses a fixed column order matching COLUMNS below.
 */
export const LC_TABLE = "controlTable"; // embedded string[][] matrix
export const LC_TABLE_MODE = "tableMode"; // "embedded" | "reference"
export const LC_TABLE_REF = "tableRef"; // uid of a world Table entity
export const LC_DEFAULT_POOL = "defaultPool"; // uid of a workerPool entity

// By-name column mapping for referenced tables (values are referenced-table column keys).
export const LC_MAP_SOURCE = "mapSource";
export const LC_MAP_DESTINATION = "mapDestination";
export const LC_MAP_ACTOR = "mapActor";
export const LC_MAP_POOL = "mapPool";
export const LC_MAP_PRIORITY = "mapPriority";

const MODE_EMBEDDED = "embedded";
const MODE_REFERENCE = "reference";

const ACTOR_TYPE_OPTIONS = [
    {value: "human", label: "human"},
    {value: "agv", label: "agv"},
    {value: "forklift", label: "forklift"},
];

// Fixed embedded column order — backend reads these positionally (0..4).
const COLUMNS: SimTableColumn[] = [
    {key: "source", title: "source", type: "entityRef"},
    {key: "destination", title: "destination", type: "entityRef"},
    {key: "actorType", title: "actor.type", type: "select", options: ACTOR_TYPE_OPTIONS, width: 110},
    {
        key: "pool",
        title: "worker.pool",
        type: "entityRef",
        entityType: SimFactory.TYPE_WORKER_POOL,
    },
    {key: "priority", title: "priority", type: "int", width: 80},
];

// Mission fields that a referenced table's columns are mapped onto.
// `schemaKey` is the column key produced by "Format & auto-map"; `candidates`
// are substrings used to guess the column when auto-mapping an existing table.
const MAPPING_FIELDS = [
    {attribute: LC_MAP_SOURCE, label: "source", schemaKey: "source", candidates: ["source", "from", "src"]},
    {attribute: LC_MAP_DESTINATION, label: "destination", schemaKey: "destination", candidates: ["destination", "dest", "to", "target"]},
    {attribute: LC_MAP_ACTOR, label: "actor.type", schemaKey: "actorType", candidates: ["actor", "type", "kind"]},
    {attribute: LC_MAP_POOL, label: "worker.pool", schemaKey: "pool", candidates: ["pool", "worker", "resource"]},
    {attribute: LC_MAP_PRIORITY, label: "priority", schemaKey: "priority", candidates: ["priority", "prio", "order"]},
];

export default function LogisticsControlBehProperties({
    entity,
}: LogisticsControlBehPropertiesProps) {
    const [t] = useTranslation();

    if (Object.keys(entity.typeData).length === 0) {
        entity.typeData = {
            [LC_TABLE_MODE]: MODE_EMBEDDED,
            [LC_TABLE]: [],
        };
    }

    const td = entity.typeData as any;
    const [mode, setMode] = React.useState<string>(td[LC_TABLE_MODE] ?? MODE_EMBEDDED);

    function markModified() {
        entity.modified = true;
    }

    return (
        <>
            <Typography.Text type="secondary">
                {t("logistics.control.hint")}
            </Typography.Text>

            <Divider style={{margin: "8px 0"}} />

            <WorldEntitySelect
                data={td}
                attribute={LC_DEFAULT_POOL}
                entityType={SimFactory.TYPE_WORKER_POOL}
                label="default.worker.pool"
                onChange={markModified}
            />

            <Form.Item label={`${t("table.source")}:`} style={{marginBottom: 8}}>
                <Segmented
                    size="small"
                    value={mode}
                    onChange={(v) => {
                        td[LC_TABLE_MODE] = v as string;
                        setMode(v as string);
                        markModified();
                    }}
                    options={[
                        {value: MODE_EMBEDDED, label: t("embedded.table")},
                        {value: MODE_REFERENCE, label: t("world.table")},
                    ]}
                />
            </Form.Item>

            {mode === MODE_EMBEDDED ? (
                <SimTable
                    columns={COLUMNS}
                    data={td}
                    attribute={LC_TABLE}
                    onChange={markModified}
                />
            ) : (
                <ReferencedTableConfig typeData={td} onChange={markModified} />
            )}
        </>
    );
}

interface ReferencedTableConfigProps {
    typeData: any;
    onChange: () => void;
}

function ReferencedTableConfig({typeData, onChange}: ReferencedTableConfigProps) {
    const [t] = useTranslation();
    const tables = useWorldEntities(SimFactory.TYPE_TABLE);
    const [tableRef, setTableRef] = React.useState<string>(typeData[LC_TABLE_REF] ?? "");
    const [version, setVersion] = React.useState(0);
    const [editorOpen, setEditorOpen] = React.useState(false);
    const {activate, deactivate} = useTurtleModal();

    const referenced = tables.find((e) => e.uid === tableRef);

    const columnOptions = React.useMemo(() => {
        const cols = (referenced?.typeData as any)?.[TABLE_COLUMNS] ?? [];
        return cols.map((c: any) => ({value: c.key, label: c.title ?? c.key}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [referenced, version]);

    function bump() {
        setVersion((v) => v + 1);
    }

    // Reshape the referenced table to the logistics mission schema and point the
    // mapping at those columns.
    function formatAndMap() {
        if (!referenced) return;
        const td = referenced.typeData as any;

        const schema = COLUMNS.map((c) => ({...c, title: t(c.title ?? c.key)}));
        td[TABLE_COLUMNS] = schema;

        const rows: string[][] = Array.isArray(td[TABLE_ROWS]) ? td[TABLE_ROWS] : [];
        td[TABLE_ROWS] = rows.map((r) => {
            const nr = [...r];
            while (nr.length < schema.length) nr.push("");
            return nr.slice(0, schema.length);
        });
        referenced.modified = true;

        MAPPING_FIELDS.forEach((f) => {
            typeData[f.attribute] = f.schemaKey;
        });

        bump();
        onChange();
    }

    // Match the referenced table's existing columns to mission fields by name.
    function autoMapByName() {
        if (!referenced) return;
        const cols = (referenced.typeData as any)[TABLE_COLUMNS] ?? [];
        MAPPING_FIELDS.forEach((f) => {
            const match = cols.find((c: any) => {
                const hay = `${c.key ?? ""} ${c.title ?? ""}`.toLowerCase();
                return f.candidates.some((cand) => hay.includes(cand));
            });
            typeData[f.attribute] = match?.key ?? "";
        });
        bump();
        onChange();
    }

    const tableActions = [
        {key: "edit", icon: <EditOutlined />, label: t("edit.table"), onClick: () => setEditorOpen(true)},
        {key: "format", icon: <FormatPainterOutlined />, label: t("format.and.map"), onClick: formatAndMap},
        {key: "auto", icon: <ThunderboltOutlined />, label: t("auto.map"), onClick: autoMapByName},
    ];

    function openTableActions() {
        activate({
            title: "actions",
            width: 320,
            content: (
                <List
                    dataSource={tableActions}
                    renderItem={(action) => (
                        <List.Item
                            style={{cursor: "pointer", padding: "8px 4px"}}
                            onClick={() => {
                                deactivate();
                                action.onClick();
                            }}
                        >
                            <Space>
                                {action.icon}
                                {action.label}
                            </Space>
                        </List.Item>
                    )}
                />
            ),
        });
    }

    return (
        <>
            <WorldEntitySelect
                data={typeData}
                attribute={LC_TABLE_REF}
                entityType={SimFactory.TYPE_TABLE}
                label="world.table"
                allowEmpty={false}
                onChange={() => {
                    setTableRef(typeData[LC_TABLE_REF] ?? "");
                    onChange();
                }}
                suffix={
                    <Button
                        size="small"
                        icon={<MoreOutlined />}
                        disabled={!referenced}
                        onClick={openTableActions}
                    />
                }
            />

            {referenced ? (
                <>
                    <Divider style={{margin: "8px 0"}} titlePlacement="start" plain>
                        {t("column.mapping")}
                    </Divider>
                    {MAPPING_FIELDS.map((field) => (
                        <Form.Item
                            key={field.attribute}
                            label={`${t(field.label)}:`}
                            style={{marginBottom: 8}}
                        >
                            <Select
                                size="small"
                                allowClear
                                value={typeData[field.attribute] || undefined}
                                onChange={(v) => {
                                    typeData[field.attribute] = v ?? "";
                                    bump();
                                    onChange();
                                }}
                                options={columnOptions}
                            />
                        </Form.Item>
                    ))}
                </>
            ) : (
                <Typography.Text type="secondary">
                    {t("select.world.table.hint")}
                </Typography.Text>
            )}

            <Modal
                open={editorOpen}
                title={referenced?.name ?? t("world.table")}
                width={760}
                footer={null}
                destroyOnHidden
                onCancel={() => {
                    setEditorOpen(false);
                    bump();
                }}
            >
                {referenced && <SimTableEditor entity={referenced} onChange={bump} />}
            </Modal>
        </>
    );
}
