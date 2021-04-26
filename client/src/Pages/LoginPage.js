import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/LoginPage.css";

// Components
import Copyright from "../Components/Copyright";
import SnackBar from "../Components/SnackBar";

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
    backgroundColor: "#4285F4",
  },

  submit: {
    margin: "auto",
    marginTop: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#4285F4",
  },
};

export class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    err: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    axios
      .post("/api/user/login", this.state)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.data.accessToken);
          this.props.history.push("/dashboard");
        }
      })
      .catch((res) => {
        this.setState({
          err: res.data,
        });
      });
  };
  render() {
    const { classes } = this.props;
    const err = this.state.err;
    console.log(err);
    return (
      <div className={classes.paper}>
        {err && <SnackBar></SnackBar>}
        <Avatar className={classes.avatar}>
          <FiLock />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className="form" onSubmit={this.handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={this.handleChange}
            autoFocus
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
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        <div className="footer">
          <Typography variant="caption">
            <Link to="/signup"> Need an Account? Sign up here. </Link>
          </Typography>
        </div>
        <Copyright />
      </div>
    );
  }
}

export default withStyles(styles)(LoginPage);
