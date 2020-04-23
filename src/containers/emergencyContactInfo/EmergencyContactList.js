import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllDonorEmergencyContacts } from "./action";
import { history } from "../../Routes";
class EmergencyContactList extends Component {
  componentDidMount() {
    const { Donor_id } = this.props.match.params;
    this.props.getData(Donor_id);
  }
  render() {
    const { data } = this.props;
    const { Donor_Name, Donor_id } = this.props.match.params;
    return (
      <div className="card">
        <h4 style={{ textAlign: "left", paddingLeft: "10px" }}>
          Emergency Contact list for donor :<b> {Donor_Name}</b>.
          <button
            className="commonbtn"
            style={{ float: "right", margin: "10px" }}
            onClick={() => {
              history.push(`/AddEmergencyContact/${Donor_id}/${Donor_Name}`);
            }}
          >
            Add Emergency Contact
          </button>
        </h4>
        {JSON.stringify(data)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.app.emergencyContactList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (Donor_id) => {
      dispatch(getAllDonorEmergencyContacts(Donor_id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmergencyContactList);
