import React, {useEffect} from 'react';
import ApexCharts from 'apexcharts';

const groupData = (data, acc) => {
    return data.reduce((acc, current) => {
        const place = current.place;
        if (acc[place]) {
            acc[place].push(current);
        }
        return acc;
    }, acc)
};

const groupDataValue = (data, acc) => {
    return data.reduce((acc, current) => {
        const place = current.place;
        if (acc[place]) {
            acc[place].push(current.value);
        }
        return acc;
    }, acc)
};

function Chart(props) {
    useEffect(() => {
        let chart = new ApexCharts(document.querySelector("#" + props.id), props.option);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [props.id, props.option]);

    return <div id={props.id}/>;
}

export default Chart;
export {groupData, groupDataValue};
