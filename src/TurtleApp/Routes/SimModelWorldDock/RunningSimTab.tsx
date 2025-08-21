import React from "react"
import TurtleEmpty from "@Turtle/Components/TurtleEmpty";
import {SimEvent} from "@TurtleApp/Routes/SimModelWorldDock/Data/SimEvent";

import {Card, Tag, Space, Typography, Empty} from 'antd';
import {PlayCircleOutlined, StopOutlined, CheckCircleOutlined, ClockCircleOutlined} from '@ant-design/icons';

const {Text, Title} = Typography;

export default function RunningSimTab() {

    const event1 = new SimEvent()


    return (
        <div>

            <EventsList/>
            <TurtleEmpty/>
        </div>
    )
}

interface _EventViewProps {
    event: SimEvent
}

function _EventView({event}: _EventViewProps) {
    return (
        <div>
            {
                event.id
            }
            {
                event.type
            }
        </div>
    )
}


type EventType = "spawn" | "unspawn" | "finish";

interface Event {
    id: string;
    type: EventType;
    name: string;
    timestamp: Date;
    duration?: number;
}

const eventIcons = {
    spawn: PlayCircleOutlined,
    unspawn: StopOutlined,
    finish: CheckCircleOutlined,
};

const eventColors = {
    spawn: 'success',
    unspawn: 'error',
    finish: 'processing',
};

// Mock data generator
const generateMockEvents = (): Event[] => {
    const eventTypes: EventType[] = ["spawn", "unspawn", "finish"];
    const eventNames = [
        "Database Connection",
        "User Authentication",
        "File Processing",
        "Email Service",
        "Cache Update",
        "API Request",
        "Background Job",
        "Data Sync",
    ];

    return Array.from({length: 12}, (_, i) => ({
        id: `event-${i + 1}`,
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        name: eventNames[Math.floor(Math.random() * eventNames.length)],
        timestamp: new Date(Date.now() - Math.random() * 3600000), // Random time within last hour
        duration: Math.random() > 0.5 ? Math.floor(Math.random() * 5000) + 1000 : undefined,
    }));
};

function formatDuration(ms: number): string {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
}

function formatTimestamp(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
}

export  function EventsList() {
    const [events, setEvents] = React.useState<Event[]>([]);
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        // Initialize with mock data
        setEvents(generateMockEvents().sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));

        // Update current time every second for relative timestamps
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Simulate new events coming in
        const eventTimer = setInterval(() => {
            const newEvent: Event = {
                id: `event-${Date.now()}`,
                type: ["spawn", "unspawn", "finish"][Math.floor(Math.random() * 3)] as EventType,
                name: [
                    "Database Connection",
                    "User Authentication",
                    "File Processing",
                    "Email Service",
                    "Cache Update",
                    "API Request",
                ][Math.floor(Math.random() * 6)],
                timestamp: new Date(),
                duration: Math.random() > 0.5 ? Math.floor(Math.random() * 5000) + 1000 : undefined,
            };

            setEvents((prev) => [newEvent, ...prev].slice(0, 20)); // Keep only latest 20 events
        }, 3000);

        return () => {
            clearInterval(timer);
            clearInterval(eventTimer);
        };
    }, []);

    return (
        <div style={{padding: '16px'}}>
            <Space align="center" style={{marginBottom: '16px', color: '#8c8c8c'}}>
                <ClockCircleOutlined/>
                <Text type="secondary">Live event stream - Updates every 3 seconds</Text>
            </Space>

            <Space direction="vertical" size="middle" style={{width: '100%'}}>
                {events.map((event) => {
                    const IconComponent = eventIcons[event.type];
                    const color = eventColors[event.type];

                    return (
                        <Card
                            key={event.id}
                            hoverable
                            style={{
                                transition: 'all 0.2s',
                                borderRadius: '8px',
                            }}
                            bodyStyle={{padding: '16px'}}
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
                                        <IconComponent style={{fontSize: '16px'}}/>
                                    </div>

                                    <div>
                                        <Space align="center" size="small" style={{marginBottom: '4px'}}>
                                            <Text strong>{event.name}</Text>
                                            <Tag color={color} style={{textTransform: 'capitalize'}}>
                                                {event.type}
                                            </Tag>
                                        </Space>
                                        <div>
                                            <Text type="secondary" style={{fontSize: '12px'}}>
                                                {formatTimestamp(event.timestamp)}
                                            </Text>
                                        </div>
                                    </div>
                                </Space>

                                <div style={{textAlign: 'right'}}>
                                    {event.duration && (
                                        <div style={{marginBottom: '4px'}}>
                                            <Text
                                                type="secondary"
                                                style={{
                                                    fontSize: '12px',
                                                    fontFamily: 'monospace',
                                                }}
                                            >
                                                {formatDuration(event.duration)}
                                            </Text>
                                        </div>
                                    )}
                                    <Text type="secondary" style={{fontSize: '11px'}}>
                                        {event.timestamp.toLocaleTimeString()}
                                    </Text>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </Space>

            {events.length === 0 && (
                <Card style={{textAlign: 'center', padding: '32px'}}>
                    <Empty
                        image={<ClockCircleOutlined style={{fontSize: '48px', color: '#d9d9d9'}}/>}
                        description={
                            <Text type="secondary">No events yet. Waiting for activity...</Text>
                        }
                    />
                </Card>
            )}
        </div>
    );
}