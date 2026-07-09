import React from "react";
import {Typography} from "antd";
import {useTranslation} from "react-i18next";

import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";
import SimTableEditor from "@TurtleSim/SimModelWorldDock/Components/SimTableEditor";
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

    return (
        <>
            <Card>
                <Typography.Text type="secondary">
                    {t("table.entity.hint")}
                </Typography.Text>

                <div style={{height: 8}} />

                <SimTableEditor entity={entity} />
            </Card>
        </>
    );
}
