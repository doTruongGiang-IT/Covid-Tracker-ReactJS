import HighchartsReact from 'highcharts-react-official';
import HighChart from 'highcharts';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, ButtonGroup } from '@material-ui/core';

const generateOptions = (data) => {
    const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));
    return {
        chart: {
            height: 500
        },
        title: {
            text: 'Number of cases'
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        color: ['#F3585B'],
        yAxis: {
            min: 0,
            title: {
                text: null
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size: 10px">{point.key}</span><table>',
            pointFormat: 
                '<tr><td style="color: {series.color}; padding: 0">{series.name}: </td>' +
                '<td style="padding: 0"><b>{point.y} case</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Number of cases',
                data: data.map((item) => item.Confirmed)
            },
        ],  
    }
};

const LineChart = ({data}) => {
    const [reportType, setReportType] = useState("all");
    const [options, setOptions] = useState({});

    useEffect(() => {
        let custom = [];
        switch(reportType) {
            case "all":
                custom = data;
                break;
            case "30":
                custom = data.slice(data.length - 30);
                break;
            case "7":
                custom = data.slice(data.length - 7);
                break;
            default:
                custom = data;
                break;
        };
        setOptions(generateOptions(custom));
    }, [data, reportType]);

    return (
        <div>
            <ButtonGroup size="small" style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button color={reportType === "all" ? "secondary" : ""} onClick={() => setReportType("all")}>All</Button>
                <Button color={reportType === "30" ? "secondary" : ""} onClick={() => setReportType("30")}>30 days</Button>
                <Button color={reportType === "7" ? "secondary" : ""} onClick={() => setReportType("7")}>7 days</Button>
            </ButtonGroup>
            <HighchartsReact highChart={HighChart} options={options} />
        </div>
    )
}

export default React.memo(LineChart);
