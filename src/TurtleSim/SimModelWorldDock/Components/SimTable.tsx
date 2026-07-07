import React from "react";
import {Button, Input, Select, theme, Tooltip} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

import {WorldSingleton} from "@TurtleApp/Data/World";
import aee from "@Turtle/Data/Aee";
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";

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
    const entities = useWorldEntities(
        column.type === "entityRef" ? column.entityType : undefined
    );

    const cellInputStyle: React.CSSProperties = {
        width: "100%",
    };

    if (column.type === "entityRef") {
        return (
            <Select
                variant="borderless"
                size="small"
                style={cellInputStyle}
                value={value || undefined}
                allowClear
                showSearch
                optionFilterProp="label"
                onChange={(v) => onChange(v ?? "")}
                options={entities.map((e) => ({
                    value: e.uid,
                    label: e.name || e.uid,
                }))}
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
