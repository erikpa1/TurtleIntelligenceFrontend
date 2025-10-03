import React from 'react'
import {Card, Col, Empty, Flex, Space, Table, TableProps, Tag, Typography} from "antd";
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";

interface MaterialForecastType {
    key: string;
    timePeriod: string;
    steel: number;
    concrete: number;
    timber: number;
    aluminum: number;
    copper: number;
}

// Helper function to generate random number within a range
function randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to generate quarter labels
function generateQuarterLabel(index: number): string {
    const year = 2025 + Math.floor(index / 4);
    const quarter = (index % 4) + 1;
    return `Q${quarter} ${year}`;
}


// Generate 100+ rows of random data
function generateForecastData(rowCount: number = 100): MaterialForecastType[] {
    const data: MaterialForecastType[] = [];

    for (let index = 0; index < rowCount; index++) {
        data.push({
            key: String(index + 1),
            timePeriod: generateQuarterLabel(index),
            steel: randomInRange(800, 3000),
            concrete: randomInRange(2000, 8000),
            timber: randomInRange(300, 900),
            aluminum: randomInRange(500, 1500),
            copper: randomInRange(200, 600),
        });
    }

    return data;
}

export default function ForecastView() {

    function renderTimePeriod(text: string) {
        return <strong>{text}</strong>;
    }

    function renderNumber(value: number) {
        return value.toLocaleString();
    }


    function showTotal(total: number) {
        return `Total ${total} records`;
    }

    const columns: TableProps<MaterialForecastType>['columns'] = [
        {
            title: 'Time Period',
            dataIndex: 'timePeriod',
            key: 'timePeriod',
            fixed: 'left',
            width: 150,
            render: renderTimePeriod,
            onHeaderCell: () => ({
                style: {textAlign: 'center'}
            }),
        },
        {
            title: 'Steel (tons)',
            dataIndex: 'steel',
            key: 'steel',
            align: 'right',
            render: renderNumber,
            onHeaderCell: () => ({
                style: {textAlign: 'center'}
            }),
        },
        {
            title: 'Concrete (m³)',
            dataIndex: 'concrete',
            key: 'concrete',
            align: 'right',
            render: renderNumber,
            onHeaderCell: () => ({
                style: {textAlign: 'center'}
            }),
        },
        {
            title: 'Timber (m³)',
            dataIndex: 'timber',
            key: 'timber',
            align: 'right',
            render: renderNumber,
            onHeaderCell: () => ({
                style: {textAlign: 'center'}
            }),
        },
        {
            title: 'Aluminum (kg)',
            dataIndex: 'aluminum',
            key: 'aluminum',
            align: 'right',
            render: renderNumber,
            onHeaderCell: () => ({
                style: {textAlign: 'center'}
            }),
        },
        {
            title: 'Copper (kg)',
            dataIndex: 'copper',
            key: 'copper',
            align: 'right',
            render: renderNumber,
            onHeaderCell: () => ({
                style: {textAlign: 'center'}
            }),
        }
    ];

    const data: MaterialForecastType[] = generateForecastData(100);

    const newData: MaterialForecastType[] = generateForecastData(5);


    return (
        <div>
            <TopBarWrapper>
                <div/>
            </TopBarWrapper>

            <Flex
                vertical
                gap={15}
                style={{
                    padding: "15px",

                }}
            >

                <Typography.Title level={3}>Forecast</Typography.Title>

                <Table<MaterialForecastType>
                    bordered={true}
                    columns={columns}
                    dataSource={newData}
                    pagination={false}
                    size={"small"}
                    // scroll={{x: 1200}}
                    sticky={true}
                    tableLayout={"auto"}
                    scroll={{x: 'max-content'}}
                />

                <Typography.Title level={3}>Previous data</Typography.Title>


                <Table<MaterialForecastType>
                    bordered={true}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    size={"small"}
                    // scroll={{x: 1200}}
                    sticky={true}
                    tableLayout={"auto"}
                    scroll={{x: 'max-content'}}

                />
            </Flex>

            <div>

            </div>
        </div>
    )
}