import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/SignupPage.css";

// Components
import Copyright from "../Components/Copyright";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

// Icons
import { FiLock } from "react-icons/fi";

const styles = {
  paper: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    marginBottom: "0.5rem",
    backgroundColor: "#1aa260",
  },

  submit: {
    margin: "auto",
    marginTop: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#1aa260",
    "&:hover": {
      backgroundColor: "#1aa260",
    },
  },

  
};

export class SignupPage extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    // Todo: on Submit logic here
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FiLock />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className="form" onSubmit={this.handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            onChange={this.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            onChange={this.handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={this.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={this.handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            onChange={this.handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
        <div className="footer">
          <Typography variant="caption">
            <Link to="/">Already have an Account? Login here. </Link>
          </Typography>
        </div>
        <Copyright />
      </div>
    );
  }
}

export default withStyles(styles)(SignupPage);
