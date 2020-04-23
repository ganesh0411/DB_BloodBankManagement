import React, { Component } from "react";
import { connect } from "react-redux";
import { addDonor } from "./action";
import { getBranchList } from "../branch/action";
import { history } from "../../Routes";
export class AddDonor extends Component {
  state = {
    data: {
      Name: "",
      Blood_Group: "1",
      Street: "",
      City: "",
      Zip: "",
      Paid_Unpaid: false,
      Notification_Subscription: true,
      Notification_Type: "1",
      Operator_id: this.props.Operator_id,
      Emails: [""],
      Br_id: "-1",
      Phones: [0],
    },
  };
  componentDidMount() {
    if (this.props.branches.length == 0) {
      this.props.getBranchList();
    }
  }
  addPhone = () => {
    let data = this.state.data;
    data.Phones.push(0);
    this.setState({ data });
  };

  deletePhone = (index) => {
    let data = this.state.data;
    data.Phones.splice(index, 1);
    this.setState({ data });
  };
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
  checkBoxHandler = (e) => {
    const key = e.target.name;
    let { data } = this.state;
    data[key] = e.target.checked;
    this.setState({ data });
  };
  handleChange = (e) => {
    const key = e.target.name;
    let { data } = this.state;
    if (key.includes("Phones")) {
      data.Phones[key.split(".")[1]] = e.target.value;
    } else if (key.includes("Emails")) {
      data.Emails[key.split(".")[1]] = e.target.value;
    } else {
      data[key] = e.target.value;
    }

    this.setState({ data });
  };
  add = (e) => {
    e.preventDefault();
    const { data } = this.state;
    const {
      Name,
      Blood_Group,
      Street,
      City,
      Zip,
      Paid_Unpaid,
      Notification_Subscription,
      Emails,
      Br_id,
      Phones,
    } = data;
    if (
      Name &&
      Blood_Group &&
      Street &&
      City &&
      Zip &&
      Br_id != "-1" &&
      Emails.length > 0 &&
      Phones.length > 0
    ) {
      let obj = {};

      Phones.forEach((item, index) => {
        let i = index + 1;
        obj["Phone" + i] = item;
      });
      let emailObj = {};

      Emails.forEach((item, index) => {
        let i = index + 1;
        emailObj["Email" + i] = item;
      });
      this.props.addDonor({ ...data, Phones: obj, Emails: emailObj }, () => {
        history.push("/SearchDonor");
      });
    } else {
      alert("Please enter valid data");
    }
  };
  render() {
    const {
      Name,
      Blood_Group,
      Street,
      City,
      Zip,
      Paid_Unpaid,
      Notification_Subscription,
      Notification_Type,
      Emails,
      Br_id,
      Phones,
    } = this.state.data;

    const { branches } = this.props;
    return (
      <div className="card" style={{ textAlign: "left" }}>
        <h4 style={{ textAlign: "left", paddingLeft: "10px" }}>Add Donor</h4>
        <form onSubmit={this.add}>
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
            <label>Blood Group : </label>

            <select
              name="Blood_Group"
              value={Blood_Group}
              onChange={this.handleChange}
            >
              <option value={1}>O+</option>
              <option value={2}>A+</option>
              <option value={3}>B+</option>
              <option value={4}>AB+</option>
              <option value={5}>O-</option>
              <option value={6}>A-</option>
              <option value={7}>B-</option>
              <option value={8}>AB-</option>
            </select>
          </div>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <label>Street : </label>
            <input
              type="text"
              name="Street"
              value={Street}
              onChange={this.handleChange}
            />
          </div>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <label>City : </label>
            <input
              type="text"
              name="City"
              value={City}
              onChange={this.handleChange}
            />
          </div>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <label>Zip : </label>
            <input
              type="number"
              name="Zip"
              value={Zip}
              onChange={this.handleChange}
            />
          </div>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <label>Branch: </label>
            <select name="Br_id" onChange={this.handleChange} value={Br_id}>
              <option value="-1">-- select --</option>
              {branches.map((item) => (
                <option value={item.Br_id}>
                  {item.Br_Type}, {item.Street}, {item.City}
                </option>
              ))}
            </select>
          </div>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <input
              type="checkbox"
              name="Notification_Subscription"
              checked={Notification_Subscription}
              onChange={this.checkBoxHandler}
            />
            <label for="Notification_Subscription">
              Subscribe for Notification
            </label>
          </div>

          <div style={{ margin: "10px", display: "inline-block" }}>
            <label>Notification Type : </label>

            <select
              name="Notification_Type"
              value={Notification_Type}
              onChange={this.handleChange}
            >
              <option value={1}>Mail</option>
              <option value={2}>Text Message</option>
            </select>
          </div>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <input
              type="checkbox"
              name="Paid_Unpaid"
              checked={Paid_Unpaid}
              onChange={this.checkBoxHandler}
            />
            <label for="Paid_Unpaid">
             Paid Donor
            </label>
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
          <div style={{ margin: "10px" }}>
            <label>Phone No : </label>
            <span onClick={this.addPhone}>
              <a href="#">Add Phone</a>
            </span>
            {Phones.map((item, index) => (
              <div>
                <input
                  type="number"
                  name={`Phones.${index}`}
                  value={item}
                  onChange={this.handleChange}
                  style={{ margin: "5px" }}
                />
                <span
                  onClick={() => {
                    this.deletePhone(index);
                  }}
                >
                  <a href="#">Delete</a>
                </span>
              </div>
            ))}
          </div>
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
  branches: state.app.branches,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addDonor: (data, callback) => {
      dispatch(addDonor(data, callback));
    },
    getBranchList: () => {
      dispatch(getBranchList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDonor);
