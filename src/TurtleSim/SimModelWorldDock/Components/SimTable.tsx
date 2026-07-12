import React from "react";
import {Button, Input, Select, Space, Table, TableColumnType, theme, Tooltip} from "antd";
import {DeleteOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

import {WorldSingleton} from "@TurtleApp/Data/World";
import aee from "@Turtle/Data/Aee";
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";
import {useTurtleModal} from "@Turtle/Hooks/useTurtleModal";

/**
 * Reusable spreadsheet-like table, formatted in the style of Siemens Tecnomatix
 * Plant Simulation "TableFile" objects: a bordered grid with a header row, a
 * left row-index gutter and inline cell editors.
 *
 * The whole grid is persisted as a string matrix (string[][]) under
 * `data[attribute]`, which the Go backend can read back verbatim with
 * `SafeJson.GetStringMatrix(attribute)`. entityRef cells store the referenced
 * entity uid.
 */

export type SimTableColumnType =
    | "string"
    | "int"
    | "float"
    | "entityRef"
    | "select";

export interface SimTableSelectOption {
    value: string | number;
    label: string;
}

export interface SimTableColumn {
    key: string;
    title?: string;
    type?: SimTableColumnType;
    /** For entityRef columns: restrict the picker to entities of this type. */
    entityType?: string;
    /** For select columns: the fixed set of choices. */
    options?: SimTableSelectOption[];
    width?: number | string;
}

interface SimTableProps {
    columns: SimTableColumn[];
    /** Object that owns the matrix (usually an entity.typeData bag). */
    data: any;
    /** Key under which the string[][] matrix lives on `data`. */
    attribute: string;
    /** Called after every mutation so callers can flag the entity as modified. */
    onChange?: () => void;
    /** Allow renaming / adding / removing / retyping columns in the header. */
    editableColumns?: boolean;
    onColumnsChange?: (columns: SimTableColumn[]) => void;
    addRowLabel?: string;
}

function readMatrix(data: any, attribute: string): string[][] {
    const raw = data?.[attribute];
    if (!Array.isArray(raw)) {
        return [];
    }
    return raw.map((row: any) =>
        Array.isArray(row) ? row.map((cell: any) => String(cell ?? "")) : []
    );
}

/** Live list of world entities, optionally filtered by type. */
export function useWorldEntities(entityType?: string): SimEntity[] {
    const [entities, setEntities] = React.useState<SimEntity[]>([]);

    React.useEffect(() => {
        function refresh() {
            const all = Array.from(WorldSingleton.I.entities.values());
            setEntities(
                entityType ? all.filter((e) => e.type === entityType) : all
            );
        }

        refresh();
        aee.on("WorldEntitiesChanged", refresh);
        return () => aee.off("WorldEntitiesChanged", refresh);
    }, [entityType]);

    return entities;
}

export default function SimTable({
    columns,
    data,
    attribute,
    onChange,
    editableColumns,
    onColumnsChange,
    addRowLabel,
}: SimTableProps) {
    const [t] = useTranslation();
    const {token} = theme.useToken();

    const [rows, setRows] = React.useState<string[][]>(() =>
        readMatrix(data, attribute)
    );

    // Re-hydrate when the edited entity/attribute changes underneath us.
    React.useEffect(() => {
        setRows(readMatrix(data, attribute));
    }, [data, attribute]);

    function commit(next: string[][]) {
        data[attribute] = next;
        setRows(next);
        onChange?.();
    }

    function setCell(rowIdx: number, colIdx: number, value: string) {
        const next = rows.map((r) => [...r]);
        while (next[rowIdx].length < columns.length) {
            next[rowIdx].push("");
        }
        next[rowIdx][colIdx] = value;
        commit(next);
    }

    function addRow() {
        commit([...rows, columns.map(() => "")]);
    }

    function removeRow(rowIdx: number) {
        commit(rows.filter((_, i) => i !== rowIdx));
    }

    const border = `1px solid ${token.colorBorderSecondary}`;
    const headerBg = token.colorFillAlter;
    const gutterBg = token.colorFillQuaternary;

    const headerCellStyle: React.CSSProperties = {
        border,
        background: headerBg,
        padding: "2px 6px",
        fontWeight: 600,
        fontSize: token.fontSizeSM,
        color: token.colorTextSecondary,
        textAlign: "center",
        whiteSpace: "nowrap",
    };

    const cellStyle: React.CSSProperties = {
        border,
        padding: 0,
        background: token.colorBgContainer,
    };

    return (
        <div style={{width: "100%"}}>
            <div style={{overflowX: "auto"}}>
                <table
                    style={{
                        borderCollapse: "collapse",
                        width: "100%",
                        tableLayout: "fixed",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{...headerCellStyle, width: 34}}>#</th>
                            {columns.map((col, colIdx) => (
                                <th
                                    key={col.key}
                                    style={{...headerCellStyle, width: col.width}}
                                >
                                    <SimTableHeaderCell
                                        column={col}
                                        editable={!!editableColumns}
                                        onChange={(updated) => {
                                            const next = [...columns];
                                            next[colIdx] = updated;
                                            onColumnsChange?.(next);
                                        }}
                                        onRemove={
                                            editableColumns && columns.length > 1
                                                ? () => {
                                                      onColumnsChange?.(
                                                          columns.filter(
                                                              (_, i) =>
                                                                  i !== colIdx
                                                          )
                                                      );
                                                      commit(
                                                          rows.map((r) =>
                                                              r.filter(
                                                                  (_, i) =>
                                                                      i !== colIdx
                                                              )
                                                          )
                                                      );
                                                  }
                                                : undefined
                                        }
                                        fallbackTitle={t(col.key)}
                                    />
                                </th>
                            ))}
                            <th style={{...headerCellStyle, width: 34}} />
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, rowIdx) => (
                            <tr key={rowIdx}>
                                <td
                                    style={{
                                        ...headerCellStyle,
                                        background: gutterBg,
                                        fontWeight: 400,
                                    }}
                                >
                                    {rowIdx + 1}
                                </td>
                                {columns.map((col, colIdx) => (
                                    <td key={col.key} style={cellStyle}>
                                        <SimTableCell
                                            column={col}
                                            value={row[colIdx] ?? ""}
                                            onChange={(v) =>
                                                setCell(rowIdx, colIdx, v)
                                            }
                                        />
                                    </td>
                                ))}
                                <td
                                    style={{
                                        ...cellStyle,
                                        background: gutterBg,
                                        textAlign: "center",
                                    }}
                                >
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<DeleteOutlined />}
                                        onClick={() => removeRow(rowIdx)}
                                    />
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length + 2}
                                    style={{
                                        border,
                                        padding: "8px 6px",
                                        textAlign: "center",
                                        color: token.colorTextTertiary,
                                        fontSize: token.fontSizeSM,
                                    }}
                                >
                                    {t("no.rows")}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div style={{display: "flex", gap: 8, marginTop: 8}}>
                <Button
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={addRow}
                >
                    {addRowLabel ?? t("add.row")}
                </Button>
                {editableColumns && (
                    <Button
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            const idx = columns.length + 1;
                            onColumnsChange?.([
                                ...columns,
                                {key: `col${idx}`, title: `col${idx}`, type: "string"},
                            ]);
                            commit(rows.map((r) => [...r, ""]));
                        }}
                    >
                        {t("add.column")}
                    </Button>
                )}
            </div>
        </div>
    );
}

interface SimTableCellProps {
    column: SimTableColumn;
    value: string;
    onChange: (value: string) => void;
}

function SimTableCell({column, value, onChange}: SimTableCellProps) {
    const cellInputStyle: React.CSSProperties = {
        width: "100%",
    };

    if (column.type === "entityRef") {
        return (
            <EntityRefCell
                entityType={column.entityType}
                value={value}
                onChange={onChange}
            />
        );
    }

    if (column.type === "select") {
        return (
            <Select
                variant="borderless"
                size="small"
                style={cellInputStyle}
                value={value || undefined}
                allowClear
                onChange={(v) => onChange(v ?? "")}
                options={(column.options ?? []).map((o) => ({
                    value: String(o.value),
                    label: o.label,
                }))}
            />
        );
    }

    const isNumber = column.type === "int" || column.type === "float";

    return (
        <Input
            variant="borderless"
            size="small"
            style={cellInputStyle}
            type={isNumber ? "number" : "text"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

interface EntityRefCellProps {
    entityType?: string;
    value: string;
    onChange: (value: string) => void;
}

/**
 * entityRef cell: looks and behaves like the plain "select" column (same
 * borderless Select chrome, clearable, shows the picked name), but a real
 * dropdown listing every entity's full name breaks down once names get long.
 * So the dropdown never opens (open={false}) and a click instead opens a
 * searchable table (uid / name / type / pick) in a modal.
 */
function EntityRefCell({entityType, value, onChange}: EntityRefCellProps) {
    const entities = useWorldEntities(entityType);
    const {activate, deactivate} = useTurtleModal();

    const selected = entities.find((e) => e.uid === value);

    function openPicker(e: React.MouseEvent<HTMLDivElement>) {
        // Clicking the "clear" (x) icon bubbles up to this same root — don't
        // reopen the picker right after the user just cleared the value.
        if ((e.target as HTMLElement).closest(".ant-select-clear")) {
            return;
        }

        activate({
            title: "pick.entity",
            width: 560,
            content: (
                <EntityPickerTable
                    entities={entities}
                    onPick={(uid) => {
                        onChange(uid);
                        deactivate();
                    }}
                />
            ),
        });
    }

    return (
        <Select
            variant="borderless"
            size="small"
            style={{width: "100%"}}
            open={false}
            value={value || undefined}
            allowClear
            onClear={() => onChange("")}
            onClick={openPicker}
            options={value ? [{value, label: selected?.name || value}] : []}
        />
    );
}

interface EntityPickerTableProps {
    entities: SimEntity[];
    onPick: (uid: string) => void;
}

/** Column-header search box (text field + search/reset) for a text dataIndex. */
function getColumnSearchProps(
    dataIndex: "uid" | "name",
    t: (key: string) => string
): TableColumnType<SimEntity> {
    return {
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    size="small"
                    placeholder={t("search")}
                    value={selectedKeys[0] as string}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => confirm()}
                    style={{display: "block", marginBottom: 8, width: 160}}
                />
                <Space>
                    <Button type="primary" size="small" onClick={() => confirm()}>
                        {t("search")}
                    </Button>
                    <Button
                        size="small"
                        onClick={() => {
                            clearFilters?.();
                            confirm();
                        }}
                    >
                        {t("reset")}
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{color: filtered ? "#1677ff" : undefined}} />
        ),
        onFilter: (value, record) =>
            (record[dataIndex] ?? "")
                .toString()
                .toLowerCase()
                .includes(String(value).toLowerCase()),
    };
}

function EntityPickerTable({entities, onPick}: EntityPickerTableProps) {
    const [t] = useTranslation();

    const typeFilters = React.useMemo(
        () =>
            Array.from(new Set(entities.map((e) => e.type).filter(Boolean))).map(
                (v) => ({text: v, value: v})
            ),
        [entities]
    );

    return (
        <Table<SimEntity>
            size="small"
            rowKey="uid"
            dataSource={entities}
            pagination={entities.length > 8 ? {pageSize: 8} : false}
            columns={[
                {title: t("uid"), dataIndex: "uid", ellipsis: true, ...getColumnSearchProps("uid", t)},
                {title: t("name"), dataIndex: "name", ellipsis: true, ...getColumnSearchProps("name", t)},
                {
                    title: t("type"),
                    dataIndex: "type",
                    ellipsis: true,
                    width: 120,
                    filters: typeFilters,
                    filterSearch: true,
                    onFilter: (value, record) => record.type === value,
                },
                {
                    title: t("actions"),
                    key: "actions",
                    width: 80,
                    render: (_, e) => (
                        <Button size="small" onClick={() => onPick(e.uid)}>
                            {t("pick")}
                        </Button>
                    ),
                },
            ]}
        />
    );
}

interface SimTableHeaderCellProps {
    column: SimTableColumn;
    editable: boolean;
    fallbackTitle: string;
    onChange: (column: SimTableColumn) => void;
    onRemove?: () => void;
}

const COLUMN_TYPE_OPTIONS: {value: SimTableColumnType; label: string}[] = [
    {value: "string", label: "text"},
    {value: "int", label: "int"},
    {value: "float", label: "float"},
    {value: "entityRef", label: "entity"},
];

function SimTableHeaderCell({
    column,
    editable,
    fallbackTitle,
    onChange,
    onRemove,
}: SimTableHeaderCellProps) {
    if (!editable) {
        return <>{column.title ?? fallbackTitle}</>;
    }

    return (
        <div style={{display: "flex", alignItems: "center", gap: 2}}>
            <Input
                variant="borderless"
                size="small"
                style={{textAlign: "center", fontWeight: 600, padding: 0}}
                value={column.title ?? column.key}
                onChange={(e) =>
                    onChange({...column, title: e.target.value, key: e.target.value})
                }
            />
            <Select
                variant="borderless"
                size="small"
                style={{width: 64}}
                value={column.type ?? "string"}
                onChange={(v) => onChange({...column, type: v})}
                options={COLUMN_TYPE_OPTIONS}
            />
            {onRemove && (
                <Tooltip title="remove column">
                    <Button
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={onRemove}
                    />
                </Tooltip>
            )}
        </div>
    );
}
