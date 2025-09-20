//https://claude.ai/chat/ed59e98f-2c4f-4127-9ada-c18ff22095f1


import {useTranslation} from "react-i18next";
import {Card, Empty, Typography} from "antd";
import {ClockCircleOutlined} from "@ant-design/icons";
import React from "react";

export default function TurtleEmpty() {

    const [t] = useTranslation()

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px' // or desired height
        }}>
            <Empty description={t("no.data")}/>
        </div>
    )
}

export function TurtleWaitForData() {

    const [t] = useTranslation()

    return (
        <Card style={{textAlign: 'center', padding: '32px'}}>
            <Empty
                image={<ClockCircleOutlined style={{fontSize: '48px', color: '#d9d9d9'}}/>}
                description={
                    <Typography.Text type="secondary">No data yet. Waiting for activity...</Typography.Text>
                }
            />
        </Card>
    )
}