import {useTranslation} from "react-i18next";
import {useWorldConnection} from "@TurtleApp/Data/WorldZuses";
import {Segmented, Space} from "antd";
import React from "react";

export default function ConnectionsNumberingButton() {

    const [t] = useTranslation();

    const {
        numbering,
        setNumbering
    } = useWorldConnection();

    return (
        <>
            <Space>
                <div>
                    {t("edge.numbering")}
                </div>
                <Segmented
                    value={numbering}
                    onChange={setNumbering}
                    options={[
                        {label: t("disabled"), value: 0},
                        {label: t("predecessors"), value: 1},
                        {label: t("successors"), value: 2},
                    ]}
                />
            </Space>
        </>
    );
}
