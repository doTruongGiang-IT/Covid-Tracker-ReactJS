import React, { useEffect, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';
import HighChart from 'highcharts';
import hightChartsMap from 'highcharts/modules/map';
import { useState } from 'react';
import { cloneDeep } from 'lodash';

hightChartsMap(HighChart);

const initOptions = {
    chart: {
        height: '500'
    },
    title: {
        text: null
    },
    mapNavigation: {
        enabled: true
    },
    colorAxis: {
        min: 0,
        stops: [
            [0.2, '#FFC4AA'],
            [0.4, '#FF8A66'],
            [0.6, '#FF392B'],
            [0.8, '#B71525'],
            [1, '#7A0826'],
        ]
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'bottom'
    },
    series: [
        {
            mapData: {},
            name: 'Population',
            joinBy: ['hc-key', 'key']
        }
    ]
};

const HighMap = ({mapData}) => {
    const [options, setOptions] = useState({});
    const chartRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(mapData && Object.keys(mapData).length) {
            const fakeData = mapData.features.map((feature, index) => ({
                key: feature.properties['hc-key'],
                value: index
            }));
            setOptions({
                ...initOptions,
                series: [
                    {
                        ...initOptions.series[0],
                        mapData: mapData,
                        data: fakeData
                    }
                ]
            });

            if(!loaded) {
                setLoaded(true);
            };
        };
    }, [mapData, loaded]);

    useEffect(() => {
        if(chartRef && chartRef.current) {
            chartRef.current.chart.series[0].update({
                mapData,
            });
        };
    }, [mapData]);

    if(!loaded) return null;

    return (
        <HighchartsReact highChart={HighChart} options={cloneDeep(options)} constructorType='mapChart' ref={chartRef} />
    )
}

export default React.memo(HighMap);
