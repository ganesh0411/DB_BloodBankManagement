import React, { Component } from "react";
import { getAllActiveEventsForGuest } from "./action";
import { connect } from "react-redux";
import { history } from "../../Routes";
class ActveEventList extends Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    let { data } = this.props;

    return (
      <div className="card">
        <h4 style={{ textAlign: "left", paddingLeft: "10px" }}>
          List of Events
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
          <div style={{ minWidth: "300px", display: "inline-block" }}>
            Event Name
          </div>
          <div style={{ minWidth: "200px", display: "inline-block" }}>
            Event Date
          </div>
          <div style={{ minWidth: "300px", display: "inline-block" }}>
            Event Venue
          </div>
        </div>
        {data &&
          data.map((item) => (
            <EventRow data={item} delete={this.deleteEvent} />
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.app.allActiveEvents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => {
      dispatch(getAllActiveEventsForGuest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActveEventList);

class EventRow extends Component {
  delete = () => {
    const { data } = this.props;
    this.props.delete(data.Drive_id);
  };
  render() {
    const { data: item } = this.props;
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
        <div style={{ minWidth: "200px", display: "inline-block" }}>
          {item.Date_of_event.split(" 00:00:00 GMT")[0]}
        </div>
        <div style={{ minWidth: "300px", display: "inline-block" }}>
          {item.Venue}
        </div>
      </div>
    );
  }
}
