//SJSU CMPE 138 Spring2020 TEAM7
import React, { Component } from "react";
import { Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import Loader from "./components/Loader";
import App from "./App";
import Dashboard from "./containers/dashboard";
import Login from "./containers/login";
import { logOut } from "./reducer/authReducer";
import { setAuthorizationTokenInHeader } from "./utils/axioConfig";
import store from "./reducer/store";
import { resetToDefault } from "./reducer/appReducer";
import SnackBar from "./containers/snackBar";

import BranchList from "./containers/branch/BranchList";

import SearchDonor from "./containers/donor/SearchDonor";

import BloodCountForBranch from "./containers/blood/BloodCountForBranch";
import BloodUnitListForBranchForBloodGroup from "./containers/blood/BloodUnitListForBranchForBloodGroup";
import MoveBlood from "./containers/blood/MoveBlood";
import ExpiredBloodUnitList from "./containers/blood/ExpiredBloodUnitList";
import Guest from "./containers/blood/Guest";
import BloodBankList from "./containers/bloodbank/BloodBankList";
import UpdateBloodBank from "./containers/bloodbank/UpdateBloodBank";
import AddBloodBank from "./containers/bloodbank/AddBloodBank";
import AddBranch from "./containers/branch/AddBranch";
import UpdateBranch from "./containers/branch/UpdateBranch";
import AddOperator from "./containers/operator/AddOperator";
import UpdateOperator from "./containers/operator/UpdateOperator";
import OperatorList from "./containers/operator/OperatorList";
import AddDonor from "./containers/donor/AddDonor";
import EventList from "./containers/event/EventList";
import UpdateEvent from "./containers/event/UpdateEvent";
import AddEvent from "./containers/event/AddEvent";
import BloodLimitList from "./containers/bloodLimit/BloodLimitList";
import UpdateBloodLimit from "./containers/bloodLimit/UpdateBloodLimit";
import SendNotification from "./containers/sendNotification/SendNotification";
import AdminDashboard from "./containers/dashboard/AdminDashboard";
import EmergencyContactList from "./containers/emergencyContactInfo/EmergencyContactList";
import AddEmergencyContact from "./containers/emergencyContactInfo/AddEmergencyContact";
import UpdateEmergencyContact from "./containers/emergencyContactInfo/UpdateEmergencyContact";
import BackgroundImage from "./assets/images/background.jpg";
export const history = createBrowserHistory();

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `/login`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export const logoutUser = () => {
  localStorage.clear();
  setAuthorizationTokenInHeader();
  fakeAuth.signout(async () => {
    await store.dispatch(logOut());
    store.dispatch(resetToDefault());
    history.push(`/login`);
  });
};

class Routes extends Component {
  componentDidMount() {
    if (this.props.auth.loginData) {
      setAuthorizationTokenInHeader(this.props.auth.loginData.access_token);
      fakeAuth.authenticate(() => {});
    }
  }

  render() {
    return (
      <div
        className="App"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Router history={history}>
          {this.props.loading > 0 && <Loader />}
          {this.props.auth &&
            this.props.auth.loginData &&
            this.props.auth.loginData.access_token && (
              <nav
                className="navbar navbar-expand-lg navbar-light  navbar-default"
                style={{
                  backgroundColor: "rgba(255, 197, 218, 0.89)",
                  color: "white",
                }}
              >
                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav">
                    <li
                      class="nav-item"
                      onClick={() => {
                        const url = this.props.auth.loginData.DBA_id
                          ? "/adminDashboard"
                          : "/Dashboard";
                        history.push(url);
                      }}
                    >
                      <a class="nav-link" href="#">
                        Home
                      </a>
                    </li>
                    <li
                      class="nav-item"
                      onClick={() => {
                        history.push("/");
                      }}
                    >
                      <a class="nav-link" href="#">
                        Guest
                      </a>
                    </li>

                    {this.props.auth.loginData.Operator_id && (
                      <li
                        class="nav-item"
                        onClick={() => {
                          history.push(`/ListBranch`);
                        }}
                      >
                        <a class="nav-link" href="#">
                          Branch List
                        </a>
                      </li>
                    )}
                    {this.props.auth.loginData.DBA_id && (
                      <li
                        class="nav-item"
                        onClick={() => {
                          history.push(`/ListOperator`);
                        }}
                      >
                        <a class="nav-link" href="#">
                          Operator List
                        </a>
                      </li>
                    )}
                    {this.props.auth.loginData.DBA_id && (
                      <li
                        class="nav-item"
                        onClick={() => {
                          history.push(`/BloodBankList`);
                        }}
                      >
                        <a class="nav-link" href="#">
                          Blood Bank List
                        </a>
                      </li>
                    )}
                    {this.props.auth.loginData.Operator_id && (
                      <li
                        class="nav-item"
                        onClick={() => {
                          history.push(`/EventList`);
                        }}
                      >
                        <a class="nav-link" href="#">
                          Event List
                        </a>
                      </li>
                    )}
                    {this.props.auth.loginData.Operator_id && (
                      <li
                        class="nav-item"
                        onClick={() => {
                          history.push(`/BloodLimitList`);
                        }}
                      >
                        <a class="nav-link" href="#">
                          Blood Limit List
                        </a>
                      </li>
                    )}
                    {this.props.auth.loginData.Operator_id && (
                      <li
                        class="nav-item"
                        onClick={() => {
                          history.push(`/SearchDonor`);
                        }}
                      >
                        <a class="nav-link" href="#">
                          Search Donor
                        </a>
                      </li>
                    )}
                  </ul>

                  <ul
                    className="nav navbar-nav navbar-right"
                    style={{ position: "fixed", right: "10px",top:'-20px' }}
                  >
                    {" "}
                    <li class="nav-item" style={{ float: "right" }}>
                      <button className="commonbtn" onClick={logoutUser}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
            )}
          <SnackBar />
          <div className={`main-container`}>
            <Switch>
              <PrivateRoute
                path={`/Dashboard`}
                component={Dashboard}
                exact={true}
              />

              <PrivateRoute
                path={`/AddBranch`}
                component={AddBranch}
                type="create"
                exact={true}
              />
              <PrivateRoute
                path={`/UpdateBranch/:Br_id`}
                component={UpdateBranch}
                type="modify"
                exact={true}
              />
              <PrivateRoute
                path={`/ListBranch`}
                component={BranchList}
                exact={true}
              />
              <PrivateRoute
                path={`/AddOperator`}
                component={AddOperator}
                type="create"
                exact={true}
              />
              <PrivateRoute
                path={`/UpdateOperator/:Operator_id`}
                component={UpdateOperator}
                type="modify"
                exact={true}
              />
              <PrivateRoute
                path={`/ListOperator`}
                component={OperatorList}
                exact={true}
              />
              <PrivateRoute
                path={`/branch/bloodunits/:Br_id/:Br_Type`}
                component={BloodCountForBranch}
                exact={true}
              />
              <PrivateRoute
                path={`/branch/bloodgroup/bloodunits/:Blood_Group/:Br_id/:Br_Type`}
                component={BloodUnitListForBranchForBloodGroup}
                exact={true}
              />
              <PrivateRoute
                path={`/moveblood`}
                component={MoveBlood}
                exact={true}
              />
              <PrivateRoute
                path={`/expiredbloodunits`}
                component={ExpiredBloodUnitList}
                exact={true}
              />
              <PrivateRoute
                path={"/SearchDonor"}
                component={SearchDonor}
                exact={true}
              />

              <PrivateRoute
                path={"/AddDonor"}
                component={AddDonor}
                exact={true}
                type="create"
              />
              <PrivateRoute
                path={"/BloodBankList"}
                component={BloodBankList}
                exact={true}
                type="create"
              />
              <PrivateRoute
                path={"/UpdateBloodBank/:Bbank_id"}
                component={UpdateBloodBank}
                exact={true}
                type="create"
              />

              <PrivateRoute
                path={"/AddBloodBank"}
                component={AddBloodBank}
                exact={true}
                type="create"
              />
              <PrivateRoute
                path={"/EventList"}
                component={EventList}
                exact={true}
                type="create"
              />
              <PrivateRoute
                path={"/UpdateEvent/:Drive_id"}
                component={UpdateEvent}
                exact={true}
                type="create"
              />
              <PrivateRoute
                path={"/BloodLimitList"}
                component={BloodLimitList}
                exact={true}
              />
              <PrivateRoute
                path={"/UpdateBloodLimit/:Br_id/:Blood_Group"}
                component={UpdateBloodLimit}
                exact={true}
              />
              <PrivateRoute
                path={"/AddEvent"}
                component={AddEvent}
                exact={true}
                type="create"
              />
              <PrivateRoute
                path={"/adminDashboard"}
                component={AdminDashboard}
                exact={true}
                type="create"
              />
              <PrivateRoute
                path={"/sendNotification"}
                component={SendNotification}
                exact={true}
              />
              <PrivateRoute
                path={"/ListEmergencyContacts/:Donor_id/:Donor_Name"}
                component={EmergencyContactList}
                exact={true}
              />
              <PrivateRoute
                path={"/AddEmergencyContact/:Donor_id/:Donor_Name"}
                component={AddEmergencyContact}
                exact={true}
              />
              <PrivateRoute
                path={"/UpdateEmergencyContact/:Donor_id/:Donor_Name/:Phone_no"}
                component={UpdateEmergencyContact}
                exact={true}
              />
              <Route path={`/login`} component={Login} />
              {/* <PrivateRoute path={`/logout`} component={Logout} /> */}
              <Route path={`/`} component={Guest} />
              <PrivateRoute path={`/app`} component={App} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    loading: state.app.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      dispatch(logOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);

const PageNotFound = (props) => {
  return (
    <div>
      Page Not Found
      <Link to={`/`}>To Home</Link>
      <Link to={`/login`}>To Login</Link>
    </div>
  );
};
