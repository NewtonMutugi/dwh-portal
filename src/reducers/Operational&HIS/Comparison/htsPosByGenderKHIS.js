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
        case actionTypes.KHIS_HTS_POS_BY_GENDER_REQUEST:
            newState.loading = true;
            return newState;
        case actionTypes.KHIS_HTS_POS_BY_GENDER_FETCH:
            if (action.payload.filtered === true) {
                newState.listFiltered = action.payload.list;
            } else {
                newState.listUnfiltered = action.payload.list;
                newState.lastFetch = Date.now();
            }
            newState.loading = false;
            return newState;
        case actionTypes.KHIS_HTS_POS_BY_GENDER_FAILED:
            newState.loading = false;
            return newState;
        default:
            return state
    }
}
