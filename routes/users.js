const bcrypt = require("bcryptjs");
const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const {
    validateSignUpData,
    validatePassword,
    identify_loginString,
  } = require("../utils/validators");

//models 
const User = require("../models/user.model");
const config = require('../utils/auth.config');
exports.signup = (request, response) => {
  const firstname = request.body.firstname;
  const lastname = request.body.lastname;
  const email = request.body.email;
  const password = request.body.password;
  const confirmPassword = request.body.confirmpassword;
  let role = request.body.role;
  if(!role){
    role = 'employee';
  }
  const newUser = new User({firstname, lastname, email,role});
  const { valid_signup, errors_signup } = validateSignUpData(newUser);
  if (!valid_signup) {
    return response.status(400).json(errors_signup);
  }
  const { valid_password, errors_password } = validatePassword(
    password,
    confirmPassword
  );
  if (!valid_password) {
    return response.status(400).json(errors_password);
  } else {
    newUser.password = bcrypt.hashSync(password, 8);
  }
  newUser
  .save()
  .then(() => response.json({ message: `User added successfully` }))
  .catch((err) => {
    if('email' in err.keyValue)
      response.status(400).json({ email: `Email is already registered. Try Logging in.` })
    else
      response.status(400).json({ error: `${err}` })
  });
};

exports.login = (request,response)=>{
  const email = request.body.email;
  const verify_password = request.body.password;
  User.findOne({email:email})
      .then((user)=>{
        if(user){
          if(user.password){
            let passwordIsValid = bcrypt.compareSync(verify_password,user.password);
            if(!passwordIsValid){
              return response.status(401).json({
                accessToken: null,
                password:"Invalid Password"
              })
            }
            else{
              const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400,
              });
              return response.status(200).json({
                accessToken: token,
                message: "Login Successfull",
              });
            }
          }
          else{
            response.status(400).json({
              email:
                "You have signing in with another email.",
            });
          }
        }
      })
      .catch((err) => {
        response.status(500).json({ error: "" + err });
      });
}

exports.getUsers = (request,response) =>{
  const user_id = request.user_id;
  User.findOne({_id:user_id})
    .then(user=>{
      if(user){
        if(user.role==='admin'){
          User.find()
            .then(user_data=>{
              response.status(200).json(user_data)
            })
        }
        else{
          response.status(200).json({err:'user is not authorized for this operations'})
        }
      }
      else{
        response.status(400).json({err:'No such user. Please sign in again'})
      }
    })
    .catch(err=>{
      console.log('error retriving users');
    })
  }

  exports.profile = (request,response) =>{
    const employeeID = request.params.username;
    
  }


  exports.getUser = (request,response) =>{
    const user_id = request.user_id;
    console.log(user_id)
    const user_data = {}
    User.findOne({_id:user_id})
        .then(user=>{
          user_data.profile = user
          response.status(200).json(user_data)
        })
        .catch(err=>{
          response.status(500).json({ err: "" + err });
        })
  }