import React from "react";

import ReactApexChart from 'react-apexcharts';
import {useTranslation} from "react-i18next";


export default function LLMClusterPerformanceView({clusterUid}) {

    const [t] = useTranslation()
    const [isLoading, setIsLoading] = React.useState(false)
    const [cluster, setCluster] = React.useState(null)

    async function refresh() {

    }

    React.useEffect(() => {
        refresh()
    }, [])


    function generateTimeseriesData() {
        const data: Array<any> = []
        const startDate = new Date('2023-01-01').getTime()

        for (let i = 0; i < 30; i++) {
            const date = startDate + (i * 24 * 60 * 60 * 1000); // Add days
            const value = Math.floor(Math.random() * 100) + 50 + Math.sin(i / 10) * 20
            data.push([date, Math.round(value)])
        }

        return data;
    };

    const [chartData] = React.useState(generateTimeseriesData());

    const chartOptions = {
        chart: {
            type: 'area',
            height: 400,
            zoom: {
                enabled: true,
                type: 'x',
                autoScaleYaxis: true,
                zoomedArea: {
                    fill: {
                        color: '#90CAF9',
                        opacity: 0.4
                    },
                    stroke: {
                        color: '#0D47A1',
                        opacity: 0.4,
                        width: 1
                    }
                }
            },
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true
                }
            }
        },
        colors: ['#2196F3'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                format: 'dd MMM'
            }
        },
        yaxis: {
            title: {
                text: 'Value'
            },
            labels: {
                formatter: function (val) {
                    return val.toFixed(0);
                }
            }
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            },
            y: {
                formatter: function (val) {
                    return val + ' units';
                }
            }
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            }
        },
        title: {
            text: `${t("requests.perday")}:`,
            align: 'left',
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#263238'
            }
        }
    };

    const series = [{
        name: 'Sample Data',
        data: chartData
    }];

    return (
        <ReactApexChart
            options={chartOptions as any}
            series={series}
            type="area"
            height={400}
        />
    );
}