import { FETCH_DASHBOARD_API, FETCH_TOPFIVE_API, FETCH_SUMMARY_API, FETCH_TIMELINE_API } from '../constants/actionsconstant';
import axios from "axios";

export const fetchDashboardAPI = () => (dispatch) => {
    axios
        .get("https://www.theunpaidmedia.com/dashboard", {
            crossDomain: true
        })
        .then((response) => {
            dispatch({ type: FETCH_DASHBOARD_API, payload: response.data })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

export const fetchKPIDashboardAPI = () => (dispatch) => {
    //KPI data
    axios
        .get(
            "https://www.theunpaidmedia.com/dashboard/topfive"
        )
        .then((response) => {
            // handle success
            let kpiData = {
                State_confirmed_rate: [],
                State_recovery_rate: [],
                State_death_rate: [],
                State_positivity_rate: [],
                State_testing_rate: [],
                State: [],
            };
            response.data.forEach((data) => {
                kpiData["State_confirmed_rate"][data["confirmed_rank"]] =
                    { stateName: data["State_confirmed_rate"], value: data["confirmed_rate"] };
                kpiData["State"][data["confirmed_rank"]] = { stateName: data["State"], value: data['Confirmed'] };
                kpiData["State_death_rate"][data["confirmed_rank"]] =
                    { stateName: data["State_death_rate"], value: data['death_rate'] };
                kpiData["State_positivity_rate"][data["confirmed_rank"]] =
                    { stateName: data["State_positivity_rate"], value: data['Positivity Rate'] };
                kpiData["State_testing_rate"][data["confirmed_rank"]] =
                    { stateName: data["State_testing_rate"], value: data['testing_rate'] };
                kpiData["State_recovery_rate"][data["confirmed_rank"]] =
                    { stateName: data["State_recovery_rate"], value: data['recovery_rate'] };
            });
            dispatch({ type: FETCH_TOPFIVE_API, payload: kpiData })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

export const fetchSummaryAPI = () => (dispatch) => {
    axios
        .get("https://www.theunpaidmedia.com/dashboard/summary")
        .then((response) => {
            dispatch({ type: FETCH_SUMMARY_API, payload: response.data[0] })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

export const fetchTimelineAPI = () => (dispatch) => {
    axios
        .get("https://www.theunpaidmedia.com/dashboard/growth")
        .then((response) => {
            dispatch({ type: FETCH_TIMELINE_API, payload: response.data })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}
