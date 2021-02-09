import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as twelveMonthRetentionSelectors from '../../../selectors/CT/TreatmentOutcomes/twelveMonthRetention';

const TwelveMonthRetention = () => {
    const [twelveMonthRetention, setTwelveMonthRetention] = useState({});
    const twelveMonthRetentionData = useSelector(twelveMonthRetentionSelectors.getTwelveMonthRetention);

    const loadTwelveMonthRetention = useCallback(async () => {
        setTwelveMonthRetention({
            title: { text: '' },
            xAxis: [{ categories: twelveMonthRetentionData.yearCategories, title: { text: 'Year of start from 2011' }, crosshair: true }],
            yAxis: [{ title: { text: 'Number of Patients' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number of Patients', data: twelveMonthRetentionData.data, type: 'column', color: "#485969" },
            ]
        });
    }, [twelveMonthRetentionData]);

    useEffect(() => {
        loadTwelveMonthRetention();
    }, [loadTwelveMonthRetention]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        12 MONTH RETENTION BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={twelveMonthRetention} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TwelveMonthRetention;
