import React, { Component } from "react";
import "../styles/ViewComponent.css";

// MUI Stuff
import Typography from "@material-ui/core/Typography";

export class ViewComponent extends Component {
  handleOkay = () => {
    this.props.toggleView();
  };

  render() {
    const { data } = this.props;
    return (
      <div className="viewWrapper">
        <Typography variant="h6">Employee Basic Info</Typography>
        <hr />
        <div className="viewRow">
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Name:{" "}
          </Typography>
          <Typography variant="body1">
            &nbsp;{data.firstname} {data.lastname}
          </Typography>
        </div>
        <div className="viewRow">
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Date of Birth:{" "}
          </Typography>
          <Typography variant="body1">&nbsp;{data.dob} </Typography>
        </div>
        <div className="viewRow">
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Gender:{" "}
          </Typography>
          <Typography variant="body1">&nbsp;{data.gender} </Typography>
        </div>
        <div className="viewRow">
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Address Line 1:{" "}
          </Typography>
          <Typography variant="body1">&nbsp;{data.addressline1} </Typography>
        </div>
        <div className="viewRow">
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Address Line 2:{" "}
          </Typography>
          <Typography variant="body1">&nbsp;{data.addressline2} </Typography>
        </div>
        <div className="viewRow">
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            City:{" "}
          </Typography>
          <Typography variant="body1">&nbsp;{data.city} </Typography>
        </div>
        <div className="viewRow">
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            State:{" "}
          </Typography>
          <Typography variant="body1">&nbsp;{data.state} </Typography>
        </div>
        <div className="viewRow">
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            ZIP:{" "}
          </Typography>
          <Typography variant="body1">&nbsp;{data.zip} </Typography>
        </div>
        <div className="viewRow">
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Phone:{" "}
          </Typography>
          <Typography variant="body1">&nbsp;{data.phonenumber} </Typography>
        </div>

        <div className="viewRow footer">
          <button className="okayButton" onClick={this.handleOkay}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default ViewComponent;
