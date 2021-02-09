import * as actionTypes from '../types';

export const filterByCounty = counties => ({
    type: actionTypes.FILTER_BY_COUNTY,
    payload: { counties }
});

export const filterBySubCounty = subCounties => ({
    type: actionTypes.FILTER_BY_SUB_COUNTY,
    payload: { subCounties }
});

export const filterByFacility = facilities => ({
    type: actionTypes.FILTER_BY_FACILITY,
    payload: { facilities }
});

export const filterByPartner = partners => ({
    type: actionTypes.FILTER_BY_PARTNER,
    payload: { partners }
});

export const filterByAgency = agencies => ({
    type: actionTypes.FILTER_BY_AGENCY,
    payload: { agencies }
});

export const filterByProject = projects => ({
    type: actionTypes.FILTER_BY_PROJECT,
    payload: { projects }
});

export const filterByFromDate = fromDate => ({
    type: actionTypes.FILTER_BY_FROM_DATE,
    payload: { fromDate }
});

export const filterByToDate = toDate => ({
    type: actionTypes.FILTER_BY_TO_DATE,
    payload: { toDate }
});

export const enableFromDateFilter = () => ({
    type: actionTypes.ENABLE_FROM_DATE_FILTER
});

export const disableFromDateFilter = () => ({
    type: actionTypes.DISABLE_FROM_DATE_FILTER
});

export const enableToDateFilter = () => ({
    type: actionTypes.ENABLE_TO_DATE_FILTER
});

export const disableToDateFilter = () => ({
    type: actionTypes.DISABLE_TO_DATE_FILTER
});

export const enableAgencyFilter = () => ({
    type: actionTypes.ENABLE_AGENCY_FILTER
});

export const disableAgencyFilter = () => ({
    type: actionTypes.DISABLE_AGENCY_FILTER
});

export const enableFacilityFilter = () => ({
    type: actionTypes.ENABLE_FACILITY_FILTER
});

export const disableFacilityFilter = () => ({
    type: actionTypes.DISABLE_FACILITY_FILTER
});