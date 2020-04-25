//SJSU CMPE 138 Spring2020 TEAM7
import React, { Component } from "react";
import { connect } from "react-redux";
import { getLowBloodUnitList } from "./action";

export class ShowMessageForLowBloodLimit extends Component {
  componentDidMount() {
    this.props.getData();
  }
  render() {
    const { data } = this.props;
    return (
      <div className="card" style={{maxWidth:'650px'}}>
        <h4 style={{ textAlign: "left", paddingLeft: "10px" }}>Notification</h4>
        {data &&
          data.map((item) => (
            <div
              style={{
                textAlign: "left",
                marginLeft: "10px",
                marginRight: "10px",
                borderBottom: "grey solid 1px",
                marginBottom: "5px",
                cursor: "pointer",
              }}
            >
              Blood is required in{" "}
              <b>
                {item.Br_Type}, {item.Street}, {item.City}
              </b>{" "}
              for <b>{item.Blood_Group}</b>.
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.app.lowBloodUnitList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => {
      dispatch(getLowBloodUnitList());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowMessageForLowBloodLimit);
