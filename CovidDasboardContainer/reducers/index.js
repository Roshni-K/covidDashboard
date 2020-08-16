import { FETCH_DASHBOARD_API, FETCH_TOPFIVE_API, FETCH_SUMMARY_API, FETCH_TIMELINE_API } from '../constants/actionsconstant';

const initialState = {
    statewise: [],
    kpiDataState: {},
    consolidatedData: {},
    timelineRange: [],
};
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DASHBOARD_API:
            return {
                ...state,
                statewise: action.payload
            }
        case FETCH_TOPFIVE_API:
            return {
                ...state,
                kpiDataState: action.payload
            }
        case FETCH_SUMMARY_API:
            return {
                ...state,
                consolidatedData: action.payload
            }
        case FETCH_TIMELINE_API:
            return {
                ...state,
                timelineRange: action.payload
            }
        default:
            return state;
    }
}
export default rootReducer;