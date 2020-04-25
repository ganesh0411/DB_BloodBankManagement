//SJSU CMPE 138 Spring2020 TEAM7
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateEmergencyContact, getEmergencyContactInfo } from "./action";
import { history } from "../../Routes";
class UpdateEmergencyContact extends Component {
  state = {
    data: {
      Donor_id: "",
      Operator_id: this.props.Operator_id,
      Name: "",
      Emails: [""],
      Phone_no: "",
      Bbank_id: this.props.Bbank_id,
    },
  };
  componentDidMount() {
    const { Donor_id, Phone_no } = this.props.match.params;
    this.props.getEmergencyContactInfo({ Donor_id, Phone_no }, (data) => {
      let keys = Object.keys(data.Email_id);
      let email_arr = [];
      keys.forEach((item) => {
        email_arr.push(data.Email_id[item]);
      });
      data.Emails = email_arr;
      this.setState({
        data: {
          ...this.state.data,
          Donor_id: data.Donor_id,
          Name: data.Name,
          Emails: data.Emails,
          Phone_no: data.Phone_no,
        },
      });
    });
  }
  addEmail = () => {
    let data = this.state.data;
    data.Emails.push("");
    this.setState({ data });
  };

  deleteEmail = (index) => {
    let data = this.state.data;
    data.Emails.splice(index, 1);
    this.setState({ data });
  };
  handleChange = (e) => {
    const key = e.target.name;
    let { data } = this.state;
    if (key.includes("Emails")) {
      data.Emails[key.split(".")[1]] = e.target.value;
    } else {
      data[key] = e.target.value;
    }

    this.setState({ data });
  };
  update = (e) => {
    e.preventDefault();
    const { data } = this.state;
    let emailObj = {};
    const { Name, Phone_no, Emails } = data;
    if (Name && Phone_no && Emails.length > 0) {
      Emails.forEach((item, index) => {
        let i = index + 1;
        emailObj["Email" + i] = item;
      });
      this.props.updateEmergencyContact({ ...data, Emails: emailObj }, () => {
        const { Donor_id, Donor_Name } = this.props.match.params;
        history.push(`/ListEmergencyContacts/${Donor_id}/${Donor_Name}`);
      });
    } else {
      alert("Please enter valid data.");
    }
  };
  render() {
    const { Donor_Name } = this.props.match.params;
    const { Name, Phone_no, Emails } = this.state.data;
    return (
      <div className="card" style={{ textAlign: "left"}}>
        <h4 style={{ textAlign: "left", paddingLeft: "10px" }}>
          Update Emergency Contact for donor :<b> {Donor_Name}</b>.
        </h4>
        <form onSubmit={this.update}>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <label>Name : </label>
            <input
              type="text"
              name="Name"
              value={Name}
              onChange={this.handleChange}
            />
          </div>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <label>Phone No : </label>
            <input
              type="number"
              name="Phone_no"
              value={Phone_no}
              readOnly
              disabled
              onChange={this.handleChange}
            />
          </div>
          <div style={{ margin: "10px" }}>
            <label>Emails : </label>
            <span onClick={this.addEmail}>
              <a href="#">Add Email</a>
            </span>
            {Emails.map((item, index) => (
              <div>
                <input
                  type="email"
                  name={`Emails.${index}`}
                  value={item}
                  onChange={this.handleChange}
                  style={{ margin: "5px" }}
                />
                <span
                  onClick={() => {
                    this.deleteEmail(index);
                  }}
                >
                  <a href="#">Delete</a>
                </span>
              </div>
            ))}
          </div>

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
  Bbank_id: state.auth.loginData.Bbank_id,
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
