const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { RandomPicture } = require("random-picture");
const {
  validateSignUpData,
  validatePassword,
  identify_loginString,
} = require("../utils/validators");
const calc = require("../utils/calculator");

const BasicEmployeeInfo = require("../models/employee.model");
const User = require("../models/user.model");
const EmploymentInfo = require("../models/employmentinfo.model");
const { collection, db } = require("../models/employee.model");

exports.addEmployee = (request, response) => {
  const firstname = request.body.firstname;
  const lastname = request.body.lastname;
  const email = request.body.email;
  const password = request.body.password;
  const dob = request.body.dob;
  const gender = request.body.gender;
  const addressline1 = request.body.addressline1;
  const addressline2 = request.body.addressline2;
  const city = request.body.city;
  const state = request.body.state;
  const zip = request.body.zip;
  const phonenumber = request.body.phonenumber;
  const newUser = new User({ firstname, lastname, email });
  const newEmployee = new BasicEmployeeInfo({});
  newUser.password = bcrypt.hashSync(password, 8);
  let photoUrl = "";
  RandomPicture()
    .then((ImageObject) => {
      photoUrl = ImageObject.url;
    })
    .catch((err) => {
      console.log("error retrieving photourl");
    });
  db.collection("users")
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        response.status(400).json({
          err: "User already exists",
        });
      } else {
        db.collection("users")
          .insertOne(newUser)
          .then((result) => {
            let emp_id = result.insertedId;
            return emp_id;
          })
          .then((emp_id) => {
            if (emp_id) {
              newEmployee.firstname = firstname;
              newEmployee.lastname = lastname;
              newEmployee.email = email;
              newEmployee.employeecode = emp_id;
              newEmployee.dob = dob;
              newEmployee.gender = gender;
              newEmployee.password = newUser.password;
              newEmployee.addressline1 = addressline1;
              newEmployee.addressline2 = addressline2;
              newEmployee.city = city;
              newEmployee.state = state;
              newEmployee.zip = zip;
              newEmployee.phonenumber = phonenumber;
              newEmployee.photourl = photoUrl;
              newEmployee
                .save()
                .then(() => {
                  response.status(200).json({
                    message: "User saved successfully",
                  });
                })
                .catch((err) => {
                  response.status(400).json({
                    err: `Error storing this user ${err}`,
                  });
                });
            }
          })
          .catch((err) => {
            response.status(400).json({
              err: `Error saving this user ${err}`,
            });
          });
      }
    });
};

exports.addEmploymentInfo = (request, response) => {
  const employeecode = request.params.employeecode;
  const department = request.body.department;
  const division = request.body.division;
  const designation = request.body.designation;
  const joining_date = request.body.joining_date;
  const visa_status = request.body.visa_status;
  const working_hours = request.body.working_hours;
  const user_id = request.user_id;
  User.findOne({ _id: user_id })
    .then((user) => {
      if (user.role !== "admin") {
        response.status(400).json({
          err: "You are not permitted to perform this operation",
        });
      }
    })
    .catch((err) => {
      response.status(500).json({
        err: "Invalid Token. Please sign in again",
      });
    });
  EmploymentInfo.findOne({ employeecode: employeecode })
    .then((employee) => {
      if (employee) {
        response.status(200).json({
          err: "This user already exists in the database",
        });
      } else {
        BasicEmployeeInfo.findOne({ employeecode: employeecode }).then(
          (existing_employee) => {
            if (!existing_employee) {
              response.status(404).json({
                err: "This user does not exists. Try adding this user first",
              });
            } else {
              const newEmploymentInfo = new EmploymentInfo({
                employeecode,
                department,
                division,
                designation,
                joining_date,
                visa_status,
                working_hours,
              });
              newEmploymentInfo.save().then(() => {
                response.status(200).json({
                  message: "User's Employment Info was saved successfully",
                });
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      response.status(500).json({
        err: "Invalid employeecode",
      });
    });
};

exports.deleteEmployee = (request, response) => {
  const employeecode = request.params.employeecode;
  const user_id = request.user_id;
  User.findOne({ _id: user_id })
    .then((user) => {
      if (user.role !== "admin") {
        response.status(400).json({
          err: "You are not permitted to perform this operation",
        });
      }
    })
    .catch((err) => {
      response.status(500).json({
        err: "Invalid Token. Please sign in again",
      });
    });
  User.findOne({ _id: employeecode })
    .then((employee) => {
      if (employee) {
        User.deleteOne({ _id: employeecode })
          .then(() => {
            //User has been deleted successfully from login table
            BasicEmployeeInfo.deleteOne({ employeecode: employeecode })
              .then(() => {
                EmploymentInfo.deleteOne({ employeecode: employeecode })
                  .then(() => {
                    response.status(200).json({
                      message: "User has been delete successfully",
                    });
                  })
                  .catch((err) => {
                    response.status(503).json({
                      err: "Error deleting user",
                    });
                  });
              })
              .catch((err) => {
                response.status(503).json({
                  err: "Error deleting user",
                });
              });
          })
          .catch((err) => {
            response.status(503).json({
              err: "Error deleting user",
            });
          });
      }
    })
    .catch((err) => {
      response.status(503).json({
        err: "Error deleting user",
      });
    });
};

exports.updateEmployeeInfo = (request, response) => {
  const employeecode = request.params.employeecode;
  const firstname = request.body.firstname;
  const lastname = request.body.lastname;
  const dob = request.body.dob;
  const gender = request.body.gender;
  const addressline1 = request.body.addressline1;
  const addressline2 = request.body.addressline2;
  const city = request.body.city;
  const state = request.body.state;
  const zip = request.body.zip;
  const phonenumber = request.body.phonenumber;
  const user_id = request.user_id;
  User.findOne({ _id: user_id }).then((user) => {
    if (user.role === "admin" || user._id == employeecode) {
      User.updateOne(
        { _id: user_id },
        {
          $set: {
            firstname: firstname,
            lastname: lastname,
          },
        }
      ).then((user) => {
        if (user) {
          BasicEmployeeInfo.findOne({ employeecode: employeecode }).then(
            (employee) => {
              if (employee) {
                BasicEmployeeInfo.updateOne(
                  { employeecode: employeecode },
                  {
                    $set: {
                      firstname: firstname,
                      lastname: lastname,
                      dob: dob,
                      gender: gender,
                      addressline1: addressline1,
                      addressline2: addressline2,
                      city: city,
                      state: state,
                      zip: zip,
                      phonenumber: phonenumber,
                    },
                  }
                ).then((user) => {
                  if (user) {
                    response
                      .status(200)
                      .json({ message: "User updated successfully" });
                  } else {
                    response.status(200).json({ err: "Failed to update user" });
                  }
                });
              } else {
                response.status(200).json({
                  err: "The user does not exists in the datbase",
                });
              }
            }
          );
        }
      });
    } else {
      response.status(200).json({
        err: "You are not allowed this action",
      });
    }
  });
};

exports.getSalary = (request, response) => {
  const employeecode = request.user_id;
  const state = request.body.state;
  let hourly_rate = request.body.hourly_rate;
  const amount = request.body.amount;
  const super_rate = request.body.super_rate;
  const EmployeeSalaryData = {};
  console.log(employeecode);
  User.findOne({ _id: employeecode }).then((employee) => {
    if (employee) {
      EmployeeSalaryData.employeecode = employeecode;
      EmployeeSalaryData.state = state;
      EmployeeSalaryData.amount = amount;
      const super_rate = 6.5;
      hourly_rate = Math.floor(Math.random() * (100 - 20 + 1) + 20);
      EmployeeSalaryData.payperiod = payperiod;
      const annualSalary = calc.getAnnualSalary(hourly_rate, "FT");
      const grossIncome = calc.getGrossIncome(annualSalary);
      const incomeTax = calc.getIncomeTax(annualSalary);
      const netIncome = calc.getNetIncome(annualSalary);
      const superMoney = calc.getSuper(annualSalary, super_rate);
      console.log("annualSalary", annualSalary);
      console.log("grossIncome", grossIncome);
      console.log("incomeTax", incomeTax);
      console.log("netIncome", netIncome);
      console.log("superMoney", superMoney);
      console.log("payperiod", payperiod);
    } else {
      response.status(200).json({
        err: "This user does not exists",
      });
    }
  });
};

exports.getEmployee = (request, response) => {
  const employeecode = request.params.employeecode;
  console.log(employeecode);
  BasicEmployeeInfo.findOne({ employeecode: employeecode })
    .then((employee) => {
      response.status(200).json(employee);
    })
    .catch((err) => {
      response.status(500).json({ err: "" + err });
    });
};

exports.getEmployement = (request, response) => {
  const employeecode = request.params.employeecode;
  console.log(employeecode);
  EmploymentInfo.findOne({ employeecode: employeecode })
    .then((employee) => {
      response.status(200).json(employee);
    })
    .catch((err) => {
      response.status(500).json({ err: "" + err });
    });
};

exports.updateEmployementInfo = (request, response) => {
  const employeecode = request.params.employeecode;
  const division = request.body.division
  const department = request.body.department
  const designation = request.body.designation
  const joining_date = request.body.joining_date
  const visa_status = request.body.visa_status
  const working_hours = request.body.working_hours

  EmploymentInfo.findOne({ employeecode: employeecode }).then((employee) => {
    if (employee) {
      EmploymentInfo.updateOne(
        { employeecode: employeecode },
        {
          $set: {
            division: division,
            department: department,
            designation:designation,
            joining_date:joining_date,
            visa_status: visa_status,
            working_hours:working_hours,
          },
        }
      ).then((user) => {
        if (user) {
          response.status(200).json({ message: "User updated successfully" });
        } else {
          response.status(200).json({ err: "Failed to update user" });
        }
      });
    } else {
      response.status(200).json({
        err: "The user does not exists in the datbase",
      });
    }
  });
};
