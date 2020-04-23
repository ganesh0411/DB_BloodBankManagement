import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllDonorEmergencyContacts, deleteEmergencyContact } from "./action";
import { history } from "../../Routes";
class EmergencyContactList extends Component {
  componentDidMount() {
    const { Donor_id } = this.props.match.params;
    this.props.getData(Donor_id);
  }
  deleteEmergencyContact = (data) => {
    this.props.deleteEmergencyContact(data, () => {
      const { Donor_id } = this.props.match.params;
      this.props.getData(Donor_id);
    });
  };
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
          <div style={{ minWidth: "300px", display: "inline-block" }}>Name</div>

          <div style={{ minWidth: "300px", display: "inline-block" }}>
            Phone No
          </div>
          <div style={{ minWidth: "50px", display: "inline-block" }}>Edit</div>
          <div style={{ minWidth: "50px", display: "inline-block" }}>
            Delete
          </div>
        </div>
        {data &&
          data.map((item) => (
            <ContcatRow
              data={item}
              delete={this.deleteEmergencyContact}
              Donor_Name={Donor_Name}
            />
          ))}
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
    deleteEmergencyContact: (data, callback) => {
      dispatch(deleteEmergencyContact(data, callback));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmergencyContactList);

class ContcatRow extends React.Component {
  delete = () => {
    const { data } = this.props;
    this.props.delete(data);
  };
  render() {
    const { data: item, Donor_Name } = this.props;
    return (
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
        <div style={{ minWidth: "300px", display: "inline-block" }}>
          {item.Name}
        </div>

        <div style={{ minWidth: "300px", display: "inline-block" }}>
          {item.Phone_no}
        </div>
        <div
          style={{ minWidth: "50px", display: "inline-block" }}
          onClick={() => {
            history.push(
              `/UpdateEmergencyContact/${item.Donor_id}/${Donor_Name}/${item.Phone_no}`
            );
          }}
        >
          <a href="#">Edit</a>
        </div>
        <div
          style={{ minWidth: "50px", display: "inline-block" }}
          onClick={this.delete}
        >
          <a href="#">Delete</a>
        </div>
      </div>
    );
  }
}
