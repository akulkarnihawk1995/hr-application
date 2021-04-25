import React, { Component } from "react";
import "../styles/AdminDashboard.css";

// Components
import ViewEmployees from "../Components/ViewEmployees";
import AddEmployee from "../Components/AddEmployee";
import PayrollCalculator from "../Components/PayrollCalculator";

// MUI Stuff


export class AdminDashboard extends Component {
  state = {
    showContent: false,
    currentView: 0,
  };
  handleViewClick = () => {
    this.setState({
      showContent: true,
      currentView: 1,
    });
    // TODO: View Btn logic here
  };

  handleAddClick = () => {
    this.setState({
      showContent: true,
      currentView: 2,
    });
    // TODO: Add Btn logic here
  };

  handlePayrollClick = () => {
    this.setState({
      showContent: true,
      currentView: 3,
    });
    // TODO: Payroll Btn logic here
  };
  render() {
    const { showContent, currentView } = this.state;
    return (
      <div className="container">
        <div className="action-bar">
          <button className="action-btn" onClick={this.handleViewClick}>
            View
          </button>
          <button className="action-btn" onClick={this.handleAddClick}>
            Add Employee
          </button>
          <button className="action-btn" onClick={this.handlePayrollClick}>
            Payroll Calculator
          </button>
        </div>
        {showContent && (
          <div className="content">
            {currentView === 1 ? (
              <ViewEmployees />
            ) : currentView === 2 ? (
              <AddEmployee />
            ) : (
              <PayrollCalculator />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default AdminDashboard;
