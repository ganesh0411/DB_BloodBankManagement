import React, { Component } from "react";
import { connect } from "react-redux";
import { addEmergencyContact } from "./action";
import { history } from "../../Routes";

class AddEmergencyContact extends Component {
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
  add = (e) => {
    e.preventDefault();
    const { data } = this.state;
    this.props.addEmergencyContact(data, () => {
      const { Donor_id, Donor_Name } = this.props.match.params;
      history.push(`/ListEmergencyContacts/${Donor_id}/${Donor_Name}`);
    });
  };
  render() {
    const { Donor_Name } = this.props.match.params;
    return (
      <div className="card">
        <h4 style={{ textAlign: "left", paddingLeft: "10px" }}>
          Add Emergency Contact for donor :<b> {Donor_Name}</b>.
        </h4>
        <form onSubmit={this.add}>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <button type="submit" className="commonbtn">
              Add
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
    addEmergencyContact: (data, callback) => {
      dispatch(addEmergencyContact(data, callback));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEmergencyContact);
