import React, { Component } from "react";
import { connect } from "react-redux";
import { sendNotificationRequest } from "./action";
import { history } from "../../Routes";

class SendNotification extends Component {
  state = {
    data: {
      Blood_Group: 1,
      Bbank_id: this.props.Bbank_id,
      body: "",
    },
  };
  handleChange = (e) => {
    const key = e.target.name;
    let { data } = this.state;
    data[key] = e.target.value;
    this.setState({ data });
  };
  send = (e) => {
    e.preventDefault();
    const { data } = this.state;
    const { Blood_Group, body, Bbank_id } = data;

    if (Blood_Group && body && Bbank_id) {
      this.props.sendNotificationRequest(data, () => {
        history.push("/dashboard");
      });
    } else {
      alert("Please enter valid data");
    }
  };
  render() {
    const { Blood_Group, body } = this.state.data;
    return (
      <div className="card" style={{ textAlign: "left", padding: "10px" }}>
        <h4 style={{ textAlign: "left", paddingLeft: "10px" }}>
          Send Notification
        </h4>
        <form onSubmit={this.send}>
          <div
            style={{
              margin: "10px",
              display: "inline-block",
              verticalAlign: "top",
            }}
          >
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
          <div
            style={{
              margin: "10px",
              display: "inline-block",
              verticalAlign: "top",
            }}
          >
            <label style={{ verticalAlign: "top" }}>Message Body : </label>
            <textarea
              type="text"
              name="body"
              value={body}
              onChange={this.handleChange}
            />
          </div>

          <div
            style={{
              margin: "10px",
              display: "inline-block",
              verticalAlign: "top",
            }}
          >
            <button
              type="submit"
              className="commonbtn"
              style={{ verticalAlign: "top" }}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { Bbank_id: state.auth.loginData.Bbank_id };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendNotificationRequest: (data, callback) => {
      dispatch(sendNotificationRequest(data, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendNotification);
