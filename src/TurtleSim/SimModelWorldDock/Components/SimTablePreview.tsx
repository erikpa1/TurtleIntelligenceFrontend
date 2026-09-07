import React from "react";
import {Button, Modal, Typography, theme} from "antd";
import {ExpandAltOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

import {SimTableColumn} from "@TurtleSim/SimModelWorldDock/Components/SimTable";

interface SimTablePreviewProps {
    columns: SimTableColumn[];
    rowCount: number;
    /** How many column names to show fully before the fade. */
    maxVisible?: number;
    modalTitle?: string;
    modalWidth?: number | string;
    /** Lazily builds the full editor — only mounted while the modal is open. */
    renderEditor: () => React.ReactNode;
}

/**
 * Compact, "reversed" preview of a wide embedded table: column headers are
 * listed one per row in a single narrow column (instead of side-by-side),
 * capped at `maxVisible` and fading out past that point. Clicking anywhere
 * opens the real editable grid in a modal — a cheap stand-in for a table
 * that avoids cramming many columns into a narrow dock panel.
 */
export default function SimTablePreview({
    columns,
    rowCount,
    maxVisible = 3,
    modalTitle,
    modalWidth = 760,
    renderEditor,
}: SimTablePreviewProps) {
    const [t] = useTranslation();
    const {token} = theme.useToken();
    const [open, setOpen] = React.useState(false);

    const visible = columns.slice(0, maxVisible);
    const hiddenCount = Math.max(0, columns.length - maxVisible);
    const border = `1px solid ${token.colorBorderSecondary}`;

    return (
        <div style={{width: "100%"}}>
            <div
                style={{
                    border,
                    borderRadius: token.borderRadiusSM,
                    background: token.colorBgContainer,
                    overflow: "hidden",
                    cursor: "pointer",
                }}
                onClick={() => setOpen(true)}
            >
                <div style={{position: "relative"}}>
                    {visible.map((col, i) => (
                        <div
                            key={col.key}
                            style={{
                                padding: "5px 10px",
                                fontSize: token.fontSizeSM,
                                fontWeight: 600,
                                color: token.colorTextSecondary,
                                background:
                                    i % 2 === 0 ? token.colorFillAlter : "transparent",
                                borderBottom:
                                    hiddenCount === 0 && i === visible.length - 1
                                        ? "none"
                                        : border,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {col.title ?? col.key}
                        </div>
                    ))}

                    {hiddenCount > 0 && (
                        <div
                            style={{
                                height: 26,
                                marginTop: -26,
                                background: `linear-gradient(to bottom, transparent, ${token.colorBgContainer})`,
                                pointerEvents: "none",
                            }}
                        />
                    )}
                </div>

                {hiddenCount > 0 && (
                    <div
                        style={{
                            padding: "0 10px 6px",
                            fontSize: token.fontSizeSM,
                            color: token.colorTextTertiary,
                            textAlign: "center",
                        }}
                    >
                        +{hiddenCount} {t("more.columns")}
                    </div>
                )}
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 6,
                }}
            >
                <Typography.Text type="secondary" style={{fontSize: token.fontSizeSM}}>
                    {columns.length} {t("columns")} · {rowCount} {t("rows")}
                </Typography.Text>
                <Button
                    size="small"
                    icon={<ExpandAltOutlined />}
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(true);
                    }}
                >
                    {t("open.table")}
                </Button>
            </div>

            <Modal
                open={open}
                title={modalTitle ?? t("table")}
                width={modalWidth}
                footer={null}
                destroyOnHidden
                onCancel={() => setOpen(false)}
            >
                {open && renderEditor()}
            </Modal>
        </div>
    );
}
