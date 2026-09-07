import React from "react";
import {Button, Card, Empty, Form, InputNumber, List, Space, Tag, Typography} from "antd";
import {useTranslation} from "react-i18next";

import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";
import aee from "@Turtle/Data/Aee";
import {WorldSingleton} from "@TurtleApp/Data/World";

interface NavSystemBehPropertiesProps {
    entity: SimEntity;
}

export default function NavSystemBehProperties({entity}: NavSystemBehPropertiesProps) {
    const [t] = useTranslation();
    const [version, setVersion] = React.useState(0);
    const [picking, setPicking] = React.useState(false);

    if (Object.keys(entity.typeData).length === 0) {
        entity.typeData = {
            rounding: 0.3,
            points: [],
        };
    }

    const typeData = entity.typeData as any;
    const points: Array<number[]> = typeData.points ?? [];

    function refresh() {
        setVersion((v) => v + 1);
        WorldSingleton.I.EmitEntitiesChanged();
    }

    function startPickingPoint() {
        setPicking(true);
        aee.emit("World_PickEntity", (position: number[]) => {
            typeData.points = [...(typeData.points ?? []), position];
            setPicking(false);
            refresh();
        });
    }

    function cancelPicking() {
        aee.emit("World_CancelPick");
        setPicking(false);
    }

    function removePoint(index: number) {
        typeData.points = points.filter((_, i) => i !== index);
        refresh();
    }

    function clearPoints() {
        typeData.points = [];
        refresh();
    }

    return (
        <>
            <Form.Item label={t("rounding")}>
                <InputNumber
                    style={{width: "100%"}}
                    min={0}
                    step={0.1}
                    defaultValue={typeData.rounding}
                    onChange={(value) => {
                        typeData.rounding = value ?? 0;
                        refresh();
                    }}
                />
            </Form.Item>

            <Card
                size="small"
                title={t("nav_system.points")}
                extra={<Tag>{points.length}</Tag>}
            >
                <Space direction="vertical" style={{width: "100%"}}>
                    {
                        picking ? (
                            <Button danger block onClick={cancelPicking}>
                                {t("nav_system.cancel_pick")}
                            </Button>
                        ) : (
                            <Button type="primary" block onClick={startPickingPoint}>
                                {t("nav_system.add_point")}
                            </Button>
                        )
                    }

                    {
                        points.length === 0 ? (
                            <Empty description={t("nav_system.no_points")}/>
                        ) : (
                            <List
                                size="small"
                                dataSource={points}
                                renderItem={(point, index) => (
                                    <List.Item
                                        actions={[
                                            <Button
                                                key="remove"
                                                type="text"
                                                danger
                                                size="small"
                                                onClick={() => removePoint(index)}
                                            >
                                                {t("nav_system.remove")}
                                            </Button>,
                                        ]}
                                    >
                                        <Typography.Text>
                                            {index + 1}. ({point[0]?.toFixed(2)}, {point[1]?.toFixed(2)}, {point[2]?.toFixed(2)})
                                        </Typography.Text>
                                    </List.Item>
                                )}
                            />
                        )
                    }

                    {
                        points.length > 0 && (
                            <Button block onClick={clearPoints}>
                                {t("nav_system.clear_points")}
                            </Button>
                        )
                    }
                </Space>
            </Card>
        </>
    );
}
