import React, { Component } from "react";
import axios from "axios";
// Components
import CustomTableRow from "../Components/CustomTableRow";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = {
  table: {
    width: "73vw",
  },

  tableHeader: {
    fontWeight: "bold",
  },
};
export class ViewEmployees extends Component {
  state = {
    data: [],
  };

  componentDidMount = () => {
    this.getEmployeeData();
  };

  getEmployeeData = () => {
    axios
      .get("/api/employee/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"), //the token is a variable which holds the token
        },
      })
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { classes } = this.props;
    const data = this.state.data;
    console.log(data);
    return (
      <div>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeader}>Name</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((rowData) => (
                <CustomTableRow
                  key={rowData._id}
                  data={rowData}
                  getEmployeeData={this.getEmployeeData}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default withStyles(styles)(ViewEmployees);
