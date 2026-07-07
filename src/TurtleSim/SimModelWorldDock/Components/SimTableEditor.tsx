import React from "react";

import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";
import SimTable, {SimTableColumn} from "@TurtleSim/SimModelWorldDock/Components/SimTable";

/** typeData keys of a Table entity's grid. */
export const TABLE_COLUMNS = "columns";
export const TABLE_ROWS = "rows";

export const DEFAULT_TABLE_COLUMNS: SimTableColumn[] = [
    {key: "col1", title: "col1", type: "string"},
    {key: "col2", title: "col2", type: "string"},
];

interface SimTableEditorProps {
    /** The Table entity whose grid (typeData.columns / typeData.rows) is edited. */
    entity: SimEntity;
    onChange?: () => void;
}

/**
 * Editable grid for a placeable Table object: column definitions live in
 * typeData.columns and the cell matrix in typeData.rows. Shared by the Table
 * behaviour panel and the inline editor popup in LogisticsControl.
 */
export default function SimTableEditor({entity, onChange}: SimTableEditorProps) {
    if (Object.keys(entity.typeData).length === 0) {
        entity.typeData = {
            [TABLE_COLUMNS]: DEFAULT_TABLE_COLUMNS,
            [TABLE_ROWS]: [],
        };
    }

    const td = entity.typeData as any;
    const [columns, setColumns] = React.useState<SimTableColumn[]>(
        td[TABLE_COLUMNS] ?? DEFAULT_TABLE_COLUMNS
    );

    React.useEffect(() => {
        setColumns((entity.typeData as any)[TABLE_COLUMNS] ?? DEFAULT_TABLE_COLUMNS);
    }, [entity]);

    return (
        <SimTable
            columns={columns}
            data={td}
            attribute={TABLE_ROWS}
            editableColumns
            onColumnsChange={(next) => {
                td[TABLE_COLUMNS] = next;
                setColumns(next);
                entity.modified = true;
                onChange?.();
            }}
            onChange={() => {
                entity.modified = true;
                onChange?.();
            }}
        />
    );
}
