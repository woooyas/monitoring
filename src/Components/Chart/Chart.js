import React, {useEffect} from 'react';
import ApexCharts from 'apexcharts';

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
