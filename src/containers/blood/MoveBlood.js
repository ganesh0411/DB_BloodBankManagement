import React, { Component } from "react";
import { moveBlood } from "./action";
import { getBranchList } from "../branch/action";
import { connect } from "react-redux";
import { history } from "../../Routes";

class MoveBlood extends Component {
  state = {
    data: {
      from_branch: "-1",
      to_branch: "-1",
      Blood_Group: "1",
      Count: 0,
    },
  };
  componentDidMount() {
    if (this.props.branches.length == 0) {
      this.props.getBranchList();
    }
  }
  handleChange = (e) => {
    const key = e.target.name;
    let { data } = this.state;
    data[key] = e.target.value;
    this.setState({ data });
  };
  move = (e) => {
    e.preventDefault();
    const { data } = this.state;
    if (
      data.from_branch != "-1" &&
      data.to_branch != "-1" &&
      data.Blood_Group != "" &&
      data.Count > 0
    ) {
      this.props.moveBlood(data, () => {
        history.push("/dashboard");
      });
    } else {
      alert("Please enter valid data");
    }
  };
  render() {
    const { from_branch, to_branch, Blood_Group, Count } = this.state;
    let { branches } = this.props;
    // branches = [
    //   { Br_id: 1, Br_name: "Main" },
    //   { Br_id: 2, Br_name: "Sub" },
    // ];
    return (
      <div className="card" style={{ textAlign: "left", padding: "10px" }}>
        <h4 style={{ textAlign: "left", paddingLeft: "10px" }}>
          Move blood units from one branch to the other
        </h4>
        <form onSubmit={this.move}>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <label>From Branch : </label>
            <select
              name="from_branch"
              onChange={this.handleChange}
              value={from_branch}
            >
              <option value="-1">-- select --</option>
              {branches &&
                branches.map((item) => (
                  <option value={item.Br_id}>{item.Br_Type}</option>
                ))}
            </select>
          </div>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <label>To Branch : </label>
            <select
              name="to_branch"
              onChange={this.handleChange}
              value={to_branch}
            >
              <option value="-1">-- select --</option>
              {branches &&
                branches.map((item) => (
                  <option value={item.Br_id}>{item.Br_Type}</option>
                ))}
            </select>
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
            <label>Count : </label>
            <input
              type="number"
              name="Count"
              value={Count}
              onChange={this.handleChange}
            />
          </div>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <button className="commonbtn" type="submit">
              Move
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    branches: state.app.branches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    moveBlood: (data, callback) => {
      dispatch(moveBlood(data, callback));
    },
    getBranchList: () => {
      dispatch(getBranchList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveBlood);
