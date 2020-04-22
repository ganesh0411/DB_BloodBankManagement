import React, { Component } from "react";
import { addBloodUnit } from "./action";
import { getBranchList } from "../branch/action";
import { connect } from "react-redux";
class AddBlooadUnit extends Component {
  state = {
    data: {
      Special_Attributes: "",
      Br_id: "-1",
      Donor_id: this.props.Donor_id,
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
  add = (e) => {
    e.preventDefault();
    const { data } = this.state;
    if (data.Br_id != "-1") {
      this.props.addBloodUnit(data, this.props.closeModal);
    } else {
      alert("Select branch");
    }
  };
  render() {
    const { Special_Attributes, Br_id } = this.state.data;
    let { branches } = this.props;
    // branches = [
    //   { Br_id: 1, Br_name: "Main" },
    //   { Br_id: 2, Br_name: "Sub" },
    // ];
    return (
      <div style={{ textAlign: "left", padding: "10px" }}>
        <h4 style={{ textAlign: "left", paddingLeft: "10px" }}>
          Add Blood Unit
        </h4>
        <form onSubmit={this.add}>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <label>Branch: </label>
            <select name="Br_id" onChange={this.handleChange} value={Br_id}>
              <option value="-1">-- select --</option>
              {branches.map((item) => (
                <option value={item.Br_id}>{item.Br_Type}, {item.Street}, {item.City}</option>
              ))}
            </select>
          </div>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <label>Speacial Attributes: </label>
            <input
              type="text"
              name="Special_Attributes"
              value={Special_Attributes}
              onChange={this.handleChange}
            />
          </div>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <button className="commonbtn" type="submit">
              Add
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
    addBloodUnit: (data, callback) => {
      dispatch(addBloodUnit(data, callback));
    },
    getBranchList: () => {
      dispatch(getBranchList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBlooadUnit);
