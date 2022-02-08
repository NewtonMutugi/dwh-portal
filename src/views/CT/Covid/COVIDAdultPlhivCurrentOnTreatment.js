import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

import * as covidAdultPLHIVCurrentOnTreatmentSelectors
    from '../../../selectors/CT/Covid/covidAdultPLHIVCurrentOnTreatment';
import { useSelector } from 'react-redux';
import { formatNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';
import { Card, CardBody, CardFooter } from 'reactstrap';

const COVIDAdultPlhivCurrentOnTreatment = () => {
    const [covidAdultPlhivCurrentOnTreatment, setCovidAdultPlhivCurrentOnTreatment] = useState({});

    const currentOnArtAdults = useSelector(covidAdultPLHIVCurrentOnTreatmentSelectors.getAdultPLHIVCurrentOnTreatment).covidAdultsPLHIVCurrentOnTreatment;

    const label = 'ADULT >15 YEARS PLHIV CURRENT ON TREATMENT';

    const data = [{
        y: currentOnArtAdults * 100 / currentOnArtAdults,
        color: 'blue'
    }, {
        y: 100 - currentOnArtAdults,
        color: 'rgba(0,0,0,0)'
    }];

    let title = `<div class="row" style="text-align:center;">
        <div class="col-12" style="font-size:40px; font-weight: bold;">${formatNumber(currentOnArtAdults)}</div>
        <div class="col-12" style="font-size:18px;">AS AT ${moment().startOf('month').subtract(1, 'month').format('MMM YYYY')}</div>
    </div>`;
    const loadCovidAdultPlhivCurrentOnTreatment = useCallback(async () => {
        setCovidAdultPlhivCurrentOnTreatment({
            chart: {
                renderTo: 'container',
                type: 'pie'
            },
            title: {
                text: title,
                useHTML: true,
                align: 'center',
                verticalAlign: 'middle',
                y: 0
            },
            plotOptions: {
                pie: {
                    innerSize: 270,
                    dataLabels: false,
                    size: 290
                }
            },
            series: [{
                data: data
            }],
            credits: {
                enabled: false
            },
            tooltip: { enabled: false },
            exporting: {
                enabled: false
            }
        });
    }, [currentOnArtAdults]);

    useEffect(() => {
        loadCovidAdultPlhivCurrentOnTreatment();
    }, [loadCovidAdultPlhivCurrentOnTreatment]);


    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={covidAdultPlhivCurrentOnTreatment}/>
            <p style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '20px' }}>{label}</p>
        </div>
    );
};

export default COVIDAdultPlhivCurrentOnTreatment;
