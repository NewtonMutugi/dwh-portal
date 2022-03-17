import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadTreatmentOutcomesOverallLast12m = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().treatmentOutcomesOverallLast12m.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'tOut' && tab !== 'tOut') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchTreatmentOutcomesOverallLast12m());
    }
};

export const fetchTreatmentOutcomesOverallLast12m = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_TREATMENT_OUTCOMES_OVERALL_LAST_12M_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        fromDate: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY-MM-DD") : null,
        toDate: getState().filters.toDate ? moment(getState().filters.toDate, "MMM YYYY").format("YYYY-MM-DD") : null,
    };
    const response = await getAll('care-treatment/treatmentOutcomesOverallLast12m', params);
    dispatch({ type: actionTypes.CT_TREATMENT_OUTCOMES_OVERALL_LAST_12M_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
