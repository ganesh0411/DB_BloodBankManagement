import React, { Component } from "react";
import { connect } from "react-redux";
import { updateEmergencyContact, getEmergencyContactInfo } from "./action";
import {history} from '../../Routes';
class UpdateEmergencyContact extends Component {
  state = {
    data: {
      Donor_id: this.props.match.params.Donor_id,
      Operator_id: this.props.Operator_id,
      Name: "",
      Emails: [""],
      Phone_no: this.props.match.params.Phone_no,
      Bbank_id: 1,
    },
  };
  componentDidMount() {
    const { Donor_id, Phone_no } = this.props.match.params;
    this.props.getEmergencyContactInfo({ Donor_id, Phone_no }, (data) => {
      this.setState({ data });
    });
  }
  update = (e) => {
    e.preventDefault();
    const { data } = this.state;
    this.props.updateEmergencyContact(data, () => {
      const { Donor_id, Donor_Name } = this.props.match.params;
      history.push(`/ListEmergencyContacts/${Donor_id}/${Donor_Name}`);
    });
  };
  render() {
    const { Donor_Name } = this.props.match.params;
    return (
      <div className="card">
        <h4 style={{ textAlign: "left", paddingLeft: "10px" }}>
          Update Emergency Contact for donor :<b> {Donor_Name}</b>.
        </h4>
        <form onSubmit={this.update}>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <button type="submit" className="commonbtn">
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Operator_id: state.auth.loginData.Operator_id,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateEmergencyContact: (data, callback) => {
      dispatch(updateEmergencyContact(data, callback));
    },
    getEmergencyContactInfo: (data, callback) => {
      dispatch(getEmergencyContactInfo(data, callback));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateEmergencyContact);
