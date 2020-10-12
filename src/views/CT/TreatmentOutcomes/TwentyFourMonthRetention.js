import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const TwentyFourMonthRetention = ({ globalFilter }) => {
    const [twentyFourMonthRetention, setTwentyFourMonthRetention] = useState({});

    const loadTwentyFourMonthRetention = useCallback(async () => {
        let params = null;
        if (globalFilter) {
            params = { ...globalFilter };
        }
        const yearCategories = [];
        const result = await getAll('care-treatment/treatmentOutcomesRetention24m', params);
        let data = [];
        for(let i = 0; i < result.length; i++) {
            yearCategories[i] = result[i].year;
            data[i] = parseInt(result[i].retention);
        }
        setTwentyFourMonthRetention({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [{
                categories: yearCategories,
                crosshair: true,
                title: { text: 'Year of start from 2011' }
            }],
            yAxis: [
                {
                    title: { text: 'Number of Patients', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: { format: '{value}', style: { color: Highcharts.getOptions().colors[1] } },
                    min: 0,
                }
            ],
            legend: {
                floating: true, layout: 'vertical', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Number of Patients', data: data, type: 'bar', color: "#485969" },
            ]
        });
    }, [globalFilter]);

    useEffect(() => {
        loadTwentyFourMonthRetention();
    }, [loadTwentyFourMonthRetention]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        24 MONTH RETENTION BY YEAR OF ART START (N =495)
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={twentyFourMonthRetention} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TwentyFourMonthRetention;