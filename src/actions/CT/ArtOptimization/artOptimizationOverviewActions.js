import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadArtOptimizationOverview = (tab) => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchArtOptimizationOverview());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().artOptimizationOverview.lastFetch),
            'minutes'
        );
        if (getState().ui.ctTab !== 'txOpt' && tab !== 'txOpt') {
            return;
        }
        else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchArtOptimizationOverview());
        }
    }
};

export const fetchArtOptimizationOverview = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_OVERVIEW_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        latestPregnancy: getState().filters.latestPregnancies,
        populationType: getState().filters.populationTypes,
    };
    const response = await getAll('care-treatment/getArtOptimizationOverview', params);
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_OVERVIEW_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
