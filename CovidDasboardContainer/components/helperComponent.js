import { KPIHeader } from '../constants/helper';
import React from 'react';

export const createtableHeader = () => {
    return (
        <div className="tablerow">
            {[
                "State",
                "Confirmed",
                "Active",
                "Recovery",
                "Deceased",
                "Testing",
                "Postivity Rate"
            ].map((ele) => {
                return <div className="cellStyle">{ele}</div>;
            })}
        </div>
    );
}

export const tableContentData = (data = {}) => {
    return (
        <div className="tablerow">
            {/* title */}
            <div className="cellStyle">{data["State"]}</div>

            {/* confirmed Data */}
            <div className="cellStyledata">
                {parseInt(data["Delta_Confirmed"]) > 0 ? (
                    <div className="deltaIncrease">{`+${data["Delta_Confirmed"]}`}</div>
                ) : (
                        <br></br>
                    )}
                <div>{data["Confirmed"]}</div>
            </div>

            {/* Active */}
            <div className="cellStyledata">
                <br></br>
                <div>{data["Active"]}</div>
            </div>

            {/* Recovered */}
            <div className="cellStyledata">
                {parseInt(data["Delta_Recovered"]) > 0 ? (
                    <div className="deltaDecrease">{`+${data["Delta_Recovered"]}`}</div>
                ) : (
                        <br></br>
                    )}
                <div>{data["Recovered"]}</div>
            </div>

            {/* Death */}
            <div className="cellStyledata">
                {parseInt(data["Delta_Deaths"]) > 0 ? (
                    <div className="deltaIncrease">{`+${data["Delta_Deaths"]}`}</div>
                ) : (
                        <br></br>
                    )}
                <div>{data["Deaths"]}</div>
            </div>

            {/* testing */}
            <div className="cellStyledata">
                {parseInt(data["delta_test"]) > 0 ? (
                    <div className="deltaIncrease">{`+${data["delta_test"]}`}</div>
                ) : (
                        <br></br>
                    )}
                <div>{data["TotalSamples"]}</div>
            </div>

            {/* Postivity */}
            <div className="cellStyledata">
                <br></br>
                <div>{data["Positivity_Rate"]}</div>
            </div>

        </div>
    );
}

export const renderKpiData = (data) => {
    return Object.keys(data).map((ele) => {
        return (
            <div className="kpitab">
                <div className="kpiheading">{KPIHeader[ele]}</div>
                {data[ele] &&
                    data[ele].map((key, index) => {
                        return <div className='kpiValue'><span>{`${index}. ${key.stateName}`}</span><span className='kpipercent'>{`${key.value}`}</span></div>;
                    })}
            </div>
        );
    });
}

export const createElementforDashBoard = (data = {}, dataobj= {}) => {
    let title = data.title;
    let delta = dataobj[data.delta];
    let value = dataobj[data.value] || 0;
    return (
      <div className={title.toLowerCase()}>
        <div className="title">{title}</div>
        {delta ? <div className="delta">{`+${delta}`}</div> : <div className="delta">-</div>}
        <div className="value">{value}</div>
      </div>
    );
  }