import React from "react"
import TurtleEmpty, {TurtleWaitForData} from "@Turtle/Components/TurtleEmpty";
import {SimUpcomingEvent} from "@TurtleSim/SimModelWorldDock/Data/SimUpcomingEvent";

import {Card, Tag, Space, Typography, Empty} from 'antd';
import Icon, {PlayCircleOutlined, StopOutlined, CheckCircleOutlined, ClockCircleOutlined} from '@ant-design/icons';
import aee from "@Turtle/Data/Aee";
import {SimSecondUpdate} from "@TurtleApp/Data/SimulationResponse";
import {IconSimulation} from "@Turtle/Icons";
import {WorldSingleton} from "@TurtleApp/Data/World";
import SimFactory from "@TurtleSim/Factories/SimFactory";
import {useTranslation} from "react-i18next";
import SimGallery from "@TurtleSim/SimModelWorldDock/SimGallery";

export default function RunningSimTab() {


    return (
        <div>
            <EventsList/>
        </div>
    )
}


export function EventsList() {

    const [t] = useTranslation()

    const [simEvents, setSimEvents] = React.useState<SimUpcomingEvent[]>([])

    function receivedNewEvents(stepState: SimSecondUpdate) {

        const stayingEvenets = simEvents.filter((event) => {

            console.log(event.second, stepState.second)

            return event.second <= stepState.second
        })


        setSimEvents([...stayingEvenets, ...stepState.events])
    }

    React.useEffect(() => {
        aee.on("SimSecond", receivedNewEvents)
        return () => {
            aee.off("SimSecond", receivedNewEvents)
        }
    }, [])

    return (
        <div style={{padding: '16px'}}>

            <Space direction="vertical" size="middle" style={{width: '100%'}}>
                {simEvents.map((event, index) => {

                    const entity = WorldSingleton.I.entitiesById.get(event.id)

                    if (entity) {
                        const color = "red"

                        return (
                            <Card
                                key={`${index}-${event.id}`}
                                hoverable
                                style={{
                                    transition: 'all 0.2s',
                                    borderRadius: '8px',
                                }}
                                styles={{
                                    body: {padding: '16px'}
                                }}
                            >
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Space align="center" size="middle">
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                backgroundColor: '#f5f5f5',
                                            }}
                                        >
                                            {
                                                React.createElement(SimFactory.GetIconComponent(entity.type))
                                            }
                                        </div>

                                        <div>
                                            <Space align="center" size="small" style={{marginBottom: '4px'}}>

                                                <Typography.Text strong>
                                                    {entity.name}
                                                </Typography.Text>
                                            </Space>

                                            <div>
                                                <Typography.Text type="secondary" style={{fontSize: '12px'}}>
                                                    {event.second - WorldSingleton.I.activeSecond}
                                                </Typography.Text>
                                            </div>
                                        </div>
                                    </Space>

                                    <div style={{marginBottom: '4px'}}>
                                        <Typography.Text
                                            type="secondary"
                                            style={{
                                                fontSize: '12px',
                                                fontFamily: 'monospace',
                                            }}
                                        >
                                            <Tag color={event.GetTypeColor()}>
                                                {t(event.GetTypeName())}
                                            </Tag>
                                        </Typography.Text>
                                    </div>
                                </div>

                            </Card>
                        );
                    } else {
                        return (
                            <Card
                                key={`${index}-${event.id}`}
                                hoverable
                                style={{
                                    transition: 'all 0.2s',
                                    borderRadius: '8px',
                                }}
                                styles={{
                                    body: {padding: '16px'}
                                }}
                            >
                                Invalid entity
                            </Card>
                        )
                    }


                })}
            </Space>

            {simEvents.length === 0 && (
                <TurtleWaitForData/>
            )}
        </div>
    );
}