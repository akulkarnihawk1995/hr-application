import React, { Component } from "react";
import "../styles/AddEmployee.css";

// MUI Stuff
import TextField from "@material-ui/core/TextField";

// Icons
import { FcApproval } from "react-icons/fc";
import { Typography } from "@material-ui/core";

export class AddEmployee extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    addressline1: "",
    addressline2: "",
    city: "",
    state: "",
    zip: "",
    phonenumber: "",

    successCard: false,
  };

  handleAdd = () => {
    const data = this.state;
    console.log(data);
    // TODO:  Call API here and if SUCCESS, setState successCard = true
  };

  handleCancel = () => {
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      dob: "",
      gender: "",
      addressline1: "",
      addressline2: "",
      city: "",
      state: "",
      zip: "",
      phonenumber: "",

      successCard: false,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      firstname,
      lastname,
      email,
      password,
      dob,
      gender,
      addressline1,
      addressline2,
      city,
      state,
      zip,
      phonenumber,
      successCard,
    } = this.state;
    return (
      <div className="formWrapper">
        {!successCard ? (
          <>
            <div className="formRow">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="First Name"
                name="firstname"
                value={firstname}
                onChange={this.handleChange}
                style={{ marginLeft: "4px", marginRight: "4px" }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Last Name"
                name="lastname"
                value={lastname}
                onChange={this.handleChange}
                style={{ marginLeft: "4px", marginRight: "4px" }}
              />
            </div>
            <div className="formRow">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                value={email}
                onChange={this.handleChange}
                style={{ marginLeft: "4px", marginRight: "4px" }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
                style={{ marginLeft: "4px", marginRight: "4px" }}
              />
            </div>
            <div className="formRow">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Date of Birth"
                name="dob"
                value={dob}
                onChange={this.handleChange}
                style={{ marginLeft: "4px", marginRight: "4px" }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Gender"
                name="gender"
                value={gender}
                onChange={this.handleChange}
                style={{ marginLeft: "4px", marginRight: "4px" }}
              />
            </div>
            <div className="formRow">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Address Line 1"
                name="addressline1"
                value={addressline1}
                onChange={this.handleChange}
                style={{ marginLeft: "4px", marginRight: "4px" }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Address Line 2"
                name="addressline2"
                value={addressline2}
                onChange={this.handleChange}
                style={{ marginLeft: "4px", marginRight: "4px" }}
              />
            </div>
            <div className="formRow">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="City"
                name="city"
                value={city}
                onChange={this.handleChange}
                style={{ marginLeft: "4px", marginRight: "4px" }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="State"
                name="state"
                value={state}
                onChange={this.handleChange}
                style={{ marginLeft: "4px", marginRight: "4px" }}
              />
            </div>
            <div className="formRow">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="ZIP"
                name="zip"
                value={zip}
                onChange={this.handleChange}
                style={{ marginLeft: "4px", marginRight: "4px" }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Phone Number"
                name="phonenumber"
                value={phonenumber}
                onChange={this.handleChange}
                style={{ marginLeft: "4px", marginRight: "4px" }}
              />
            </div>
            <div className="formRow footer">
              <button className="cancelButton" onClick={this.handleCancel}>
                Cancel
              </button>
              <button className="addButton" onClick={this.handleAdd}>
                Add
              </button>
            </div>{" "}
          </>
        ) : (
          <div className="successCard">
            <FcApproval className="successIcon" />
            <Typography variant="h5"> Employee Added</Typography>
          </div>
        )}
      </div>
    );
  }
}

export default AddEmployee;
