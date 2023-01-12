import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as artByCountySelectors from '../../../selectors/CT/ArtVerification/pendingSurveys';

const ArtVerificationSurveySubmissionByCounty = () => {
    const [currentOnArtByCountyChart, setCurrentOnArtByCountyChart] = useState({});
    const countyData = useSelector(
        artByCountySelectors.getArtVerificationSubmissionByCounty
    );

    const loadCurrentOnArtByCountyChart = useCallback(async () => {
        setCurrentOnArtByCountyChart({
            title: { text: '' },
            xAxis: [
                {
                    categories: countyData.counties,
                    crosshair: true,
                },
            ],
            yAxis: [{ title: { text: '' } }],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true,
            },
            plotOptions: {
                column: {
                    stacking: 'percent',
                    pointPadding: 0.2,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                        crop: false,
                        overflow: 'none',
                    },
                },
            },
            series: [
                {
                    name: 'UNVERIFIED CLIENTS',
                    data: countyData.unverified,
                    color: '#8E2C16',
                    type: 'column',
                },
                {
                    name: 'UNVERIFIED SURVEYS SUBMITTED',
                    data: countyData.received,
                    color: '#01058A',
                    type: 'column',
                },
            ],
        });
    }, [countyData]);

    useEffect(() => {
        loadCurrentOnArtByCountyChart();
    }, [loadCurrentOnArtByCountyChart]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        SURVEYS SUBMISSION OF UNVERIFIED PATIENTS BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={currentOnArtByCountyChart}
                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ArtVerificationSurveySubmissionByCounty;