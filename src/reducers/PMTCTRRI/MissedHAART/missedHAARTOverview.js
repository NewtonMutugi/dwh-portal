import * as actionTypes from "../../../actions/types";

const initialState = {
    lastFetch: null,
    loading: false,
    listUnfiltered: [],
    listFiltered: [],
};

export default (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case actionTypes.PMTCT_RRI_MISSED_MATERNAL_HAART_OVERVIEW_REQUEST:
            newState.loading = true;
            return newState;
        case actionTypes.PMTCT_RRI_MISSED_MATERNAL_HAART_OVERVIEW_FETCH:
            if (action.payload.filtered === true) {
                newState.listFiltered = action.payload.list;
            } else {
                newState.listUnfiltered = action.payload.list;
                newState.lastFetch = Date.now();
            }
            newState.loading = false;
            return newState;
        case actionTypes.PMTCT_RRI_MISSED_MATERNAL_HAART_OVERVIEW_FAILED:
            newState.loading = false;
            newState.lastFetch = null;
            return newState;
        default:
            return state;
    }
}
