import React from "react";
import {Form, Select, Space} from "antd";
import {useTranslation} from "react-i18next";

import {useWorldEntities} from "@TurtleSim/SimModelWorldDock/Components/SimTable";

interface WorldEntitySelectProps {
    /** Object that owns the value (usually an entity.typeData bag). */
    data: any;
    /** Key on `data` holding the selected entity uid. */
    attribute: string;
    /** Restrict the picker to entities of this type. */
    entityType?: string;
    label?: string;
    allowEmpty?: boolean;
    onChange?: () => void;
    /** Rendered inline after the select, e.g. an actions button. */
    suffix?: React.ReactNode;
}

/**
 * Form select populated with the current world's entities (optionally filtered by
 * type), writing the chosen entity uid back onto `data[attribute]`.
 */
export default function WorldEntitySelect({
    data,
    attribute,
    entityType,
    label,
    allowEmpty = true,
    onChange,
    suffix,
}: WorldEntitySelectProps) {
    const [t] = useTranslation();
    const entities = useWorldEntities(entityType);
    const [value, setValue] = React.useState<string | undefined>(
        data?.[attribute] || undefined
    );

    React.useEffect(() => {
        setValue(data?.[attribute] || undefined);
    }, [data, attribute]);

    return (
        <Form.Item label={`${t(label ?? attribute)}:`} style={{marginBottom: 8}}>
            <Space.Compact style={{width: "100%"}}>
                <Select
                    size="small"
                    style={{flex: 1}}
                    value={value}
                    allowClear={allowEmpty}
                    showSearch
                    optionFilterProp="label"
                    onChange={(v) => {
                        data[attribute] = v ?? "";
                        setValue(v ?? undefined);
                        onChange?.();
                    }}
                    options={entities.map((e) => ({
                        value: e.uid,
                        label: e.name || e.uid,
                    }))}
                />
                {suffix}
            </Space.Compact>
        </Form.Item>
    );
}
