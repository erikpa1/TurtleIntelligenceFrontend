import React from 'react'
import {Card, Flex, Table, TableProps, Typography} from "antd";
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

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

    // Prepare chart data
    const categories = newData.map(item => item.timePeriod);

    // Individual material chart options
    const createMaterialChartOptions = (title: string, color: string): ApexOptions => ({
        chart: {
            type: 'line',
            height: 300,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        colors: [color],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        title: {
            text: title,
            align: 'left',
            style: {
                fontSize: '16px',
                fontWeight: 600
            }
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 5,
            hover: {
                size: 7
            }
        },
        xaxis: {
            categories: categories,
            title: {
                text: 'Time Period'
            }
        },
        yaxis: {
            title: {
                text: 'Quantity'
            },
            labels: {
                formatter: function (val) {
                    return val.toLocaleString();
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val.toLocaleString();
                }
            }
        }
    });

    // Combined chart options
    const combinedChartOptions: ApexOptions = {
        chart: {
            type: 'line',
            height: 400,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        title: {
            text: 'All Materials Forecast',
            align: 'left',
            style: {
                fontSize: '18px',
                fontWeight: 600
            }
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 4,
            hover: {
                size: 6
            }
        },
        xaxis: {
            categories: categories,
            title: {
                text: 'Time Period'
            }
        },
        yaxis: {
            title: {
                text: 'Quantity'
            },
            labels: {
                formatter: function (val) {
                    return val.toLocaleString();
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: false,
            offsetY: 0,
            offsetX: -5
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (val) {
                    return val.toLocaleString();
                }
            }
        }
    };

    // Prepare series data
    const steelSeries = [{ name: 'Steel (tons)', data: newData.map(item => item.steel) }];
    const concreteSeries = [{ name: 'Concrete (m³)', data: newData.map(item => item.concrete) }];
    const timberSeries = [{ name: 'Timber (m³)', data: newData.map(item => item.timber) }];
    const aluminumSeries = [{ name: 'Aluminum (kg)', data: newData.map(item => item.aluminum) }];
    const copperSeries = [{ name: 'Copper (kg)', data: newData.map(item => item.copper) }];

    const combinedSeries = [
        { name: 'Steel (tons)', data: newData.map(item => item.steel) },
        { name: 'Concrete (m³)', data: newData.map(item => item.concrete) },
        { name: 'Timber (m³)', data: newData.map(item => item.timber) },
        { name: 'Aluminum (kg)', data: newData.map(item => item.aluminum) },
        { name: 'Copper (kg)', data: newData.map(item => item.copper) }
    ];

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
                <Typography.Title level={3}>Forecast Charts</Typography.Title>

                {/* Combined Chart */}
                <Card>
                    <ReactApexChart
                        options={combinedChartOptions}
                        series={combinedSeries}
                        type="line"
                        height={400}
                    />
                </Card>

                {/* Individual Material Charts */}
                <Flex gap={15} wrap="wrap">
                    <Card style={{ flex: '1 1 calc(50% - 15px)', minWidth: '400px' }}>
                        <ReactApexChart
                            options={createMaterialChartOptions('Steel Forecast', '#008FFB')}
                            series={steelSeries}
                            type="line"
                            height={300}
                        />
                    </Card>

                    <Card style={{ flex: '1 1 calc(50% - 15px)', minWidth: '400px' }}>
                        <ReactApexChart
                            options={createMaterialChartOptions('Concrete Forecast', '#00E396')}
                            series={concreteSeries}
                            type="line"
                            height={300}
                        />
                    </Card>

                    <Card style={{ flex: '1 1 calc(50% - 15px)', minWidth: '400px' }}>
                        <ReactApexChart
                            options={createMaterialChartOptions('Timber Forecast', '#FEB019')}
                            series={timberSeries}
                            type="line"
                            height={300}
                        />
                    </Card>

                    <Card style={{ flex: '1 1 calc(50% - 15px)', minWidth: '400px' }}>
                        <ReactApexChart
                            options={createMaterialChartOptions('Aluminum Forecast', '#FF4560')}
                            series={aluminumSeries}
                            type="line"
                            height={300}
                        />
                    </Card>

                    <Card style={{ flex: '1 1 calc(50% - 15px)', minWidth: '400px' }}>
                        <ReactApexChart
                            options={createMaterialChartOptions('Copper Forecast', '#775DD0')}
                            series={copperSeries}
                            type="line"
                            height={300}
                        />
                    </Card>
                </Flex>

                <Typography.Title level={3}>Forecast Data</Typography.Title>

                <Table<MaterialForecastType>
                    bordered={true}
                    columns={columns}
                    dataSource={newData}
                    pagination={false}
                    size={"small"}
                    sticky={true}
                    tableLayout={"auto"}
                    scroll={{x: 'max-content'}}
                />

                <Typography.Title level={3}>Previous Data</Typography.Title>

                <Table<MaterialForecastType>
                    bordered={true}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    size={"small"}
                    sticky={true}
                    tableLayout={"auto"}
                    scroll={{x: 'max-content'}}
                />
            </Flex>
        </div>
    )
}