import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadNewOnArtByAgeSex = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().newOnArtByAgeSex.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'txNew') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchNewOnArtByAgeSex());
    }
};

export const fetchNewOnArtByAgeSex = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_NEW_ON_ART_BY_AGE_SEX_REQUEST });
    const previousMonth = moment().startOf('month').subtract(1, 'month');
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : previousMonth.format("YYYY"),
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : previousMonth.format("MM"),
    };
    const response = await getAll('care-treatment/txNewByAgeSex', params);
    dispatch({ type: actionTypes.CT_NEW_ON_ART_BY_AGE_SEX_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
