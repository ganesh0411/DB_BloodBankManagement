import React, { Component } from "react";
import { updateBloodUnit } from "./action";
import { connect } from "react-redux";
class AddBlooadUnit extends Component {
  state = {
    data: {
      Special_Attributes: this.props.Special_Attributes,
      Blood_id: this.props.Blood_id,
      Br_id: this.props.Br_id,
    },
  };

  handleChange = (e) => {
    const key = e.target.name;
    let { data } = this.state;
    data[key] = e.target.value;
    this.setState({ data });
  };
  update = (e) => {
    e.preventDefault();
    const { data } = this.state;
    this.props.updateBloodUnit(data, () => {
      this.props.closeModal(data);
    });
  };
  render() {
    const { Special_Attributes } = this.state.data;
    return (
      <div style={{ textAlign: "left", padding: "10px" }}>
        <h4 style={{ textAlign: "left", paddingLeft: "10px" }}>
          Update Blood Unit
        </h4>
        <form onSubmit={this.update}>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <label>Special Attributes: </label>
            <input
              type="text"
              name="Special_Attributes"
              value={Special_Attributes}
              onChange={this.handleChange}
            />
          </div>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <button className="commonbtn" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBloodUnit: (data, callback) => {
      dispatch(updateBloodUnit(data, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBlooadUnit);
