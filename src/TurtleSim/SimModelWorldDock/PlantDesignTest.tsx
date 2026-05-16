import React, {useState} from "react";
import {
    ConfigProvider,
    Tabs,
    Input,
    Select,
    Checkbox,
    Button,
    Form,
    Divider,
} from "antd";

// ---- Status indicator squares (the little colored boxes on the right) ----
// In Plant Simulation these usually mean: green = OK, yellow = warning/inherited.
const StatusBox = ({color = "#7fbf6a"}) => (
    <div
        style={{
            width: 14,
            height: 14,
            background: color,
            border: "1px solid #5a5a5a",
            flexShrink: 0,
        }}
    />
);

// ---- A single labeled row: "Processing time: [Const ▼] [value]  ▢ " ----
const FieldRow = ({label, selectValue, inputValue, status = "#7fbf6a", onSelect, onInput}) => (
    <div
        style={{
            display: "grid",
            gridTemplateColumns: "130px 110px 1fr 20px",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
        }}
    >
        <span style={{fontSize: 12}}>{label}</span>
        <Select
            size="small"
            value={selectValue}
            onChange={onSelect}
            options={[
                {value: "Const", label: "Const"},
                {value: "Normal", label: "Normal"},
                {value: "Uniform", label: "Uniform"},
                {value: "Negexp", label: "Negexp"},
                {value: "Erlang", label: "Erlang"},
            ]}
        />
        <Input size="small" value={inputValue} onChange={(e) => onInput?.(e.target.value)}/>
        <StatusBox color={status}/>
    </div>
);

export default function PlantSimDialog() {
    const [form, setForm] = useState({
        name: "S10",
        label: "",
        state: "Planned",
        failed: false,
        entranceLocked: false,
        exitLocked: false,
        processing: {type: "Const", value: "1:00"},
        setup: {type: "Const", value: "0:08"},
        recovery: {type: "Const", value: "0"},
        recoveryStarts: "When part enters",
        cycle: {type: "Const", value: "0:08"},
    });

    const set = (path, v) => {
        setForm((f) => {
            const next = {...f};
            const keys = path.split(".");
            let ref = next;
            for (let i = 0; i < keys.length - 1; i++) {
                ref[keys[i]] = {...ref[keys[i]]};
                ref = ref[keys[i]];
            }
            ref[keys.at(-1)] = v;
            return next;
        });
    };

    // ---- Top header strip: Name, Label, Failed, State, locks ----
    const Header = (
        <div style={{padding: "12px 14px 6px"}}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr 20px 90px 20px 130px 20px",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 8,
                }}
            >
                <span style={{fontSize: 12}}>Name:</span>
                <Input size="small" value={form.name} onChange={(e) => set("name", e.target.value)}/>
                <StatusBox/>
                <Checkbox checked={form.failed} onChange={(e) => set("failed", e.target.checked)}>
                    <span style={{fontSize: 12}}>Failed</span>
                </Checkbox>
                <span/>
                <Checkbox
                    checked={form.entranceLocked}
                    onChange={(e) => set("entranceLocked", e.target.checked)}
                >
                    <span style={{fontSize: 12}}>Entrance locked</span>
                </Checkbox>
                <StatusBox/>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr 20px 90px 20px 130px 20px",
                    gap: 8,
                    alignItems: "center",
                }}
            >
                <span style={{fontSize: 12}}>Label:</span>
                <Input size="small" value={form.label} onChange={(e) => set("label", e.target.value)}/>
                <StatusBox/>
                <Select
                    size="small"
                    value={form.state}
                    onChange={(v) => set("state", v)}
                    options={[
                        {value: "Planned", label: "Planned"},
                        {value: "Operational", label: "Operational"},
                        {value: "Paused", label: "Paused"},
                    ]}
                />
                <span/>
                <Checkbox checked={form.exitLocked} onChange={(e) => set("exitLocked", e.target.checked)}>
                    <span style={{fontSize: 12}}>Exit locked</span>
                </Checkbox>
                <StatusBox/>
            </div>
        </div>
    );

    // ---- "Times" tab content ----
    const TimesTab = (
        <div style={{padding: "16px 18px 8px"}}>
            <FieldRow
                label="Processing time:"
                selectValue={form.processing.type}
                inputValue={form.processing.value}
                onSelect={(v) => set("processing.type", v)}
                onInput={(v) => set("processing.value", v)}
            />
            <FieldRow
                label="Set-up time:"
                selectValue={form.setup.type}
                inputValue={form.setup.value}
                status="#e8c547"
                onSelect={(v) => set("setup.type", v)}
                onInput={(v) => set("setup.value", v)}
            />
            <FieldRow
                label="Recovery time:"
                selectValue={form.recovery.type}
                inputValue={form.recovery.value}
                onSelect={(v) => set("recovery.type", v)}
                onInput={(v) => set("recovery.value", v)}
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "130px 1fr 20px",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 12,
                }}
            >
                <span style={{fontSize: 12}}>Recovery time starts:</span>
                <Select
                    size="small"
                    value={form.recoveryStarts}
                    onChange={(v) => set("recoveryStarts", v)}
                    options={[
                        {value: "When part enters", label: "When part enters"},
                        {value: "When part leaves", label: "When part leaves"},
                        {value: "After processing", label: "After processing"},
                    ]}
                />
                <StatusBox/>
            </div>

            <FieldRow
                label="Cycle time:"
                selectValue={form.cycle.type}
                inputValue={form.cycle.value}
                status="#e8c547"
                onSelect={(v) => set("cycle.type", v)}
                onInput={(v) => set("cycle.value", v)}
            />
        </div>
    );

    const placeholderTab = (name) => (
        <div style={{padding: 24, fontSize: 12, color: "#666"}}>
            Placeholder content for <strong>{name}</strong>. Plug your fields in here.
        </div>
    );

    const tabItems = [
        {key: "importer", label: "Importer", children: placeholderTab("Importer")},
        {key: "failureImporter", label: "Failure Importer", children: placeholderTab("Failure Importer")},
        {key: "energy", label: "Energy", children: placeholderTab("Energy")},
        {key: "udAttrs", label: "User-defined Attributes", children: placeholderTab("User-defined Attributes")},
        {key: "times", label: "Times", children: TimesTab},
        {key: "setup", label: "Set-Up", children: placeholderTab("Set-Up")},
        {key: "failures", label: "Failures", children: placeholderTab("Failures")},
        {key: "controls", label: "Controls", children: placeholderTab("Controls")},
        {key: "exitStrategy", label: "Exit Strategy", children: placeholderTab("Exit Strategy")},
        {key: "statistics", label: "Statistics", children: placeholderTab("Statistics")},
    ];

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#3a78d1",
                    borderRadius: 2,
                    fontSize: 12,
                    controlHeightSM: 22,
                    fontFamily: "Segoe UI, Tahoma, sans-serif",
                },
                components: {
                    Tabs: {horizontalItemGutter: 0, horizontalItemPadding: "4px 14px"},
                },
            }}
        >
            <div
                style={{
                    width: 560,
                    margin: "20px auto",
                    border: "1px solid #6c6c6c",
                    background: "#f0f0f0",
                    fontFamily: "Segoe UI, Tahoma, sans-serif",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
            >
                {/* ---- Title bar ---- */}
                <div
                    style={{
                        background: "linear-gradient(#e8eef7, #c9d7ee)",
                        borderBottom: "1px solid #7a7a7a",
                        padding: "5px 10px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#1f3a68",
                    }}
                >
                    <span>.Models.Frame.S10</span>
                    <div style={{display: "flex", gap: 4}}>
                        <span style={{cursor: "pointer", padding: "0 4px"}}>?</span>
                        <span style={{cursor: "pointer", padding: "0 4px"}}>×</span>
                    </div>
                </div>

                {/* ---- Menu bar ---- */}
                <div
                    style={{
                        background: "#f0f0f0",
                        borderBottom: "1px solid #c8c8c8",
                        padding: "4px 8px",
                        fontSize: 12,
                        display: "flex",
                        gap: 14,
                    }}
                >
                    {["Navigate", "View", "Tools", "Help"].map((m) => (
                        <span key={m} style={{cursor: "pointer"}}>
              {m}
            </span>
                    ))}
                </div>

                {Header}

                <Tabs
                    defaultActiveKey="times"
                    size="small"
                    items={tabItems}
                    style={{padding: "0 6px"}}
                    tabBarStyle={{marginBottom: 0, borderBottom: "1px solid #a8a8a8"}}
                />

                {/* ---- Footer buttons ---- */}
                <Divider style={{margin: 0}}/>
                <div
                    style={{
                        padding: "10px 14px",
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 8,
                        background: "#f0f0f0",
                    }}
                >
                    <Button size="small" type="primary" style={{minWidth: 72}}>
                        OK
                    </Button>
                    <Button size="small" style={{minWidth: 72}}>
                        Cancel
                    </Button>
                    <Button size="small" style={{minWidth: 72}}>
                        Apply
                    </Button>
                </div>
            </div>
        </ConfigProvider>
    );
}