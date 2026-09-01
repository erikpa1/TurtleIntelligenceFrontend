import React from "react";
import {Typography} from "antd";
import {useTranslation} from "react-i18next";

import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";
import SimTableEditor, {
    DEFAULT_TABLE_COLUMNS,
    TABLE_COLUMNS,
    TABLE_ROWS,
    ensureTableDefaults,
} from "@TurtleSim/SimModelWorldDock/Components/SimTableEditor";
import SimTablePreview from "@TurtleSim/SimModelWorldDock/Components/SimTablePreview";
import Card from "antd/es/card/Card";

interface TableBehPropertiesProps {
    entity: SimEntity;
}

/**
 * Standalone, placeable "Table" object — the Plant Simulation TableFile analogue.
 * The whole entity IS a data grid; other behaviours can reference it by uid and
 * read its grid from the backend.
 */
export default function TableBehProperties({entity}: TableBehPropertiesProps) {
    const [t] = useTranslation();

    ensureTableDefaults(entity);
    const td = entity.typeData as any;
    const [, forceUpdate] = React.useState(0);

    const columns = td[TABLE_COLUMNS] ?? DEFAULT_TABLE_COLUMNS;
    const rows = td[TABLE_ROWS] ?? [];

    return (
        <>
            <Card>
                <Typography.Text type="secondary">
                    {t("table.entity.hint")}
                </Typography.Text>

                <div style={{height: 8}} />

                <SimTablePreview
                    columns={columns}
                    rowCount={rows.length}
                    modalTitle={entity.name || t("table.entity.hint")}
                    renderEditor={() => (
                        <SimTableEditor
                            entity={entity}
                            onChange={() => forceUpdate((v) => v + 1)}
                        />
                    )}
                />
            </Card>
        </>
    );
}
