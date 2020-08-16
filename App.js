import React, { Component } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./CovidDasboardContainer/reducers";
import loggerMiddleware from "./logger";
import { Route, Router } from "react-router-dom";
import CovidDashboard from './CovidDasboardContainer/containers/CovidDashboard'
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);

const composedEnhancers = compose(middlewareEnhancer);
const store = createStore(rootReducer, undefined, composedEnhancers);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={CovidDashboard} />
        </Router>
      </Provider>
    );
  }
}
export default App;
