import React, { Component } from "react";
import "../styles/UpdateForm.css";
import axios from "axios";
// MUI Stuff
import TextField from "@material-ui/core/TextField";

export class UpdateForm extends Component {
  state = {
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    addressline1: "",
    addressline2: "",
    city: "",
    state: "",
    zip: "",
    phonenumber: "",
    division: "",
    department: "",
    designation: "",
    joining_date: "",
    visa_status: "",
    working_hours: "",
  };

  componentDidMount = () => {
    axios
      .get(`/api/employee/${this.props.data._id}`)
      .then((res) => {
        if (res) {
          this.setState({
            firstname: res.data.firstname,
            lastname: res.data.lastname,
            dob: res.data.dob,
            gender: res.data.gender,
            addressline1: res.data.addressline1,
            addressline2: res.data.addressline2,
            city: res.data.city,
            state: res.data.state,
            zip: res.data.zip,
            phonenumber: res.data.phonenumber,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`/api/employement/${this.props.data._id}`)
      .then((res) => {
        if (res) {
          console.log("employment", res);
          this.setState({
            division: res.data.division,
            department: res.data.department,
            designation: res.data.designation,
            joining_date: res.data.joining_date,
            visa_status: res.data.visa_status,
            working_hours: res.data.working_hours,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSave = () => {
    const data = this.state;
    console.log(data);

    axios
      .post(`/api/admin/${this.props.data._id}/updateemployee`, this.state, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"), //the token is a variable which holds the token
        },
      })
      .then((res) => {
        console.log("updated successfully");
        axios
          .post(
            `/api/admin/${this.props.data._id}/updateemployement`,this.state,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"), //the token is a variable which holds the token
              },
            }
          )
          .then((res) => {
            console.log("updated successfully");
          })
          .catch((err) => {
            console.log(err);
          });
        this.props.toggleUpdate();
      })
      .catch((err) => {
        console.log(err);
      });

    // Call API and Save

  };

  handleCancel = () => {
    this.props.toggleUpdate();
  };

  render() {
    const {
      firstname,
      lastname,
      dob,
      gender,
      addressline1,
      addressline2,
      city,
      state,
      zip,
      phonenumber,
      division,
      department,
      designation,
      joining_date,
      visa_status,
      working_hours,
    } = this.state;
    return (
      <div className="formWrapper">
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="department"
            name="department"
            value={department}
            onChange={this.handleChange}
            style={{ marginLeft: "4px", marginRight: "4px" }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="division"
            name="division"
            value={division}
            onChange={this.handleChange}
            style={{ marginLeft: "4px", marginRight: "4px" }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="designation"
            name="designation"
            value={designation}
            onChange={this.handleChange}
            style={{ marginLeft: "4px", marginRight: "4px" }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="joining_date"
            name="joining_date"
            value={joining_date}
            onChange={this.handleChange}
            style={{ marginLeft: "4px", marginRight: "4px" }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="visa_status"
            name="visa_status"
            value={visa_status}
            onChange={this.handleChange}
            style={{ marginLeft: "4px", marginRight: "4px" }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="working_hours"
            name="working_hours"
            value={working_hours}
            onChange={this.handleChange}
            style={{ marginLeft: "4px", marginRight: "4px" }}
          />
        </div>

        <div className="formRow footer">
          <button className="cancelButton" onClick={this.handleCancel}>
            Cancel
          </button>
          <button className="saveButton" onClick={this.handleSave}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default UpdateForm;
