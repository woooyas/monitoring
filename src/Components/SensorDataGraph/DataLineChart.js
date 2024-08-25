import Chart, {groupData} from "../Chart/Chart";
import {useEffect, useState} from "react";
import axios from "axios";
import qs from "qs";
import dataLineConfig from "./DataLineConfig";
import {translateLocation} from "../Sensors/Sensors";

export default function DataLineChart({places, measurement}) {

    const [chartConfig, setChartConfig] = useState(dataLineConfig);

    useEffect(() => {
        axios.get("https://m0nit0ring.site/api/sensor-data/today-data", {
            params: {
                places: places,
                measurement: measurement,
            }, paramsSerializer: params => {
                return qs.stringify(params, {arrayFormat: "repeat", encode: false})
            }, headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            const data = response.data;
            const groupedData = groupData(data, {
                lobby: [],
                class_a: [],
                class_b: [],
                office: [],
                meeting_room: [],
                server_room: [],
                storage: [],
                outdoor: []
            });

            let series = [];
            let timeKey = "class_a";
            for (const groupedDataKey in groupedData) {
                if (groupedData[groupedDataKey].length > 0) {
                    series.push({
                        name: translateLocation(groupedDataKey),
                        data: groupedData[groupedDataKey].reverse().map(data => data.value)
                    })
                    timeKey = groupedDataKey;
                }
                
                setChartConfig({
                    ...dataLineConfig,
                    series: series,
                    xaxis: {
                        type: 'datetime',
                        categories: groupedData[timeKey].reverse().map(data => data.time),
                        labels: {
                            show: false
                        }
                    }
                });
            }
        }).catch(error => console.error('Error fetching data:', error));
    }, [places, measurement]);

    return (
        <Chart id="data-line-chart" option={chartConfig}/>
    );
};
