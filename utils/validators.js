const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string === undefined || string.trim() === "") return true;
  else return false;
};

exports.validateSignUpData = (data) => {
  // Validating SignUp fields
  let errors_signup = {};

  if (isEmpty(data.email)) {
    errors_signup.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors_signup.email = " Must be a valid email";
  }
  if (isEmpty(data.firstname)) {
    errors_signup.firstname = "Must not be empty";
  }

  if (isEmpty(data.lastname)) {
    errors_signup.lastname = "Must not be empty";
  }

  return {
    valid_signup: Object.keys(errors_signup).length === 0 ? true : false,
    errors_signup,
  };
};

exports.validatePassword = (password, confirmPassword) => {
  let errors_password = {};

  if (isEmpty(password)) {
    errors_password.password = "Must not be empty";
  }

  if (isEmpty(confirmPassword)) {
    errors_password.password = "Must not be empty";
  }

  if (password !== confirmPassword) {
    errors_password.confirmPassword = "Password must match";
  }

  return {
    valid_password: Object.keys(errors_password).length === 0 ? true : false,
    errors_password,
  };
};

exports.identify_loginString = (login_string) => {
  if (login_string.includes("@") && login_string.includes(".")) return "email";
  else return "username";
};
