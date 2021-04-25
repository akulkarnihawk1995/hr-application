import React, { Component } from "react";
// Components
import UpdateForm from "../Components/UpdateForm";
import ViewEmployee from "../Components/ViewComponent";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
// import { identify_loginString } from "../../../utils/validators";

const styles = {
  employeeName: {
    cursor: "pointer",
  },
  updateButton: {
    cursor: "pointer",
    appearance: "none",
    border: "0",
    backgroundColor: " #4285F4",
    color: "white",
    fontWeight: "bold",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    height: "30px",
    borderRadius: "5px",
    fontSize: "14px",
    margin: "0",
    "&:hover": {
      backgroundColor: "#3a71ca",
    },
  },

  deleteButton: {
    cursor: "pointer",
    appearance: "none",
    border: "0",
    backgroundColor: " #de5246",
    color: "white",
    fontWeight: "bold",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    margin: "0",
    height: "30px",
    borderRadius: "5px",
    fontSize: "14px",
    "&:hover": {
      backgroundColor: "#c04a3f",
    },
  },

  expandedRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export class CustomTableRow extends Component {
  state = {
    expandRow: false,
    viewComponent: false,
    updateComponent: false,
  };

  handleView = () => {
    this.toggleView();
  };

  handleUpdate = () => {
    const id = this.props.data._id;
    console.log("Update ID = " + id);
    this.toggleUpdate();

  };

  handleDelete = () => {
    const id = this.props.data._id;
    console.log("Delete ID = " + id);
    // Delete Logic here
  };

  toggleView = () => {
    this.setState({
      viewComponent: !this.state.viewComponent,
      expandRow: !this.state.expandRow,
    });
  };

  toggleUpdate = () => {
    this.setState({
      updateComponent: !this.state.updateComponent,
      expandRow: !this.state.expandRow,
    });
  };
  render() {
    const { classes, data } = this.props;
    const { expandRow, updateComponent, viewComponent } = this.state;

    return (
      <>
        <TableRow key={data._id}>
          {!viewComponent && !updateComponent ? (
            <TableCell
              component="th"
              scope="row"
              className={classes.employeeName}
              onClick={this.handleView}
            >
              {`${data.firstname} ${data.lastname}`}
            </TableCell>
          ) : (
            <TableCell
              component="th"
              scope="row"
              className={classes.employeeName}
            >
              {`${data.firstname} ${data.lastname}`}
            </TableCell>
          )}

          <TableCell align="right">
            {!updateComponent && !viewComponent && (
              <button
                className={classes.updateButton}
                onClick={this.handleUpdate}
              >
                Update
              </button>
            )}{" "}
            <button
              className={classes.deleteButton}
              onClick={this.handleDelete}
            >
              Remove
            </button>
          </TableCell>
        </TableRow>

        {expandRow && (
          <TableRow key={data._id}>
            <TableCell colSpan={2}>
              <div className={classes.expandedRow}>
                {updateComponent && (
                  <UpdateForm data={data} toggleUpdate={this.toggleUpdate} />
                )}

                {viewComponent && (
                  <ViewEmployee data={data} toggleView={this.toggleView} />
                )}
              </div>
            </TableCell>
          </TableRow>
        )}
      </>
    );
  }
}

export default withStyles(styles)(CustomTableRow);