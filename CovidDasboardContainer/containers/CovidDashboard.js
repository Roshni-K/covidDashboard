import React, { Component } from "react";
import "../styles/covidStyle.scss";
import "../styles/App.scss";
import Drawer from "@material-ui/core/Drawer";
import Logo from "../imageFolder/logo.png";
import Facebook from "../imageFolder/facebook.png";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TopBar from "../components/topbar";
import Divider from '@material-ui/core/Divider';
import Map from '../components/map';
import TimelineRange from '../components/TimelineRange';
import { fetchDashboardAPI, fetchKPIDashboardAPI, fetchSummaryAPI, fetchTimelineAPI } from '../actions/commonActions';
import { createtableHeader, tableContentData, renderKpiData, createElementforDashBoard } from '../components/helperComponent';
import { indiaDashBoard, worldDashBoard } from "../constants/helper";
import Graph from '../components/Graph'

class CovidDasboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleDrawerState: false,
    };
  }
  componentDidMount() {
    this.props.fetchDashboardAPI();
    this.props.fetchKPIDashboardAPI();
    this.props.fetchSummaryAPI();
    this.props.fetchTimelineAPI();
  }

  toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({
      toggleDrawerState: !this.state.toggleDrawerState
    })
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <TopBar toggleDrawer={(e) => this.toggleDrawer(e)} />
            <Drawer anchor={"left"} open={this.state.toggleDrawerState} onClose={(e) => this.toggleDrawer(e)}>
              <div>
                <div>
                  <img className="logo" src={Logo}></img>
                </div>
                <Divider />
                <a
                  href="https://www.facebook.com/theunpaidmediav1.0/"
                  target="_blank"
                >
                  <img className="facebook" src={Facebook}></img>
                </a>
                <Divider />
              </div>
            </Drawer>
            <div id="mainContainer">
              <div id="infodashboard">
                <div>
                  <div className="heading">INDIA vs COVID 19</div>
                  <div id="indiadashboard">
                    {Object.keys(indiaDashBoard).map((ele) => {
                      return createElementforDashBoard(indiaDashBoard[ele], this.props.statewise.filter(e => (e['State'] === "Total"))[0]);
                    })}
                  </div>
                </div>
                {/* <div>
                  <div className="heading">WORLD vs COVID 19</div>
                  <div id="worlddashboard">
                    {Object.keys(worldDashBoard).map((ele) => {
                      return createElementforDashBoard(worldDashBoard[ele], this.props.consolidatedData);

                    })}
                  </div>
                </div> */}
              </div>
              <div className="heading datetext">TIMELINE - Every 5 Lakh Milestone</div>
              <div className='timeline'>
                <TimelineRange timelineData={this.props.timelineRange} />
              </div>
              <div id="kpiDashboard">
                <div className="heading">Top States in Spotlight [Rank]</div>
                <div className="kpiData">
                  {renderKpiData(this.props.kpiDataState)}
                </div>
              </div>
              <div id='mapView'><Map stateData={this.props.statewise} /></div>
              <div id="table">
                <div>
                  <div className="heading">India's Statewise COVID 19 </div>
                  <div id="indiatableData">
                    {createtableHeader()}
                    {this.props.statewise.map((ele) => {
                      return tableContentData(ele);
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id='graph'><Graph /></div>
        <div className='footer'>
          <div>Contact Us At</div>
          <div>admin@theunpaidmedia.com</div>
          <div>The Unpaid Media <span>&#169;</span> 2020. All Rights Reserved.</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  statewise: state.statewise,
  kpiDataState: state.kpiDataState,
  consolidatedData: state.consolidatedData,
  timelineRange: state.timelineRange
});

const mapDispatchToProps = (dispatch) => ({
  fetchDashboardAPI: bindActionCreators(fetchDashboardAPI, dispatch),
  fetchKPIDashboardAPI: bindActionCreators(fetchKPIDashboardAPI, dispatch),
  fetchSummaryAPI: bindActionCreators(fetchSummaryAPI, dispatch),
  fetchTimelineAPI: bindActionCreators(fetchTimelineAPI, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CovidDasboard);
