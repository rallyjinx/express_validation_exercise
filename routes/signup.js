/* eslint no-param-reassign: 0 */
/* eslint no-plusplus: 0 */
const express = require('express');

const router = express.Router();

// Write your form and validations inside this route file.
// Add form validations in /signup for:
// Username: Required. Must be more than 6 characters, must start with a letter,
// and no punctuation.
// Password: Required. Must be more than 8 characters with atleast One letter,
// one number, and one special character (!?/.,')
// Email: Required. Must be formatted like an email, (something @ something . something)
// First Name: Required.
// Last Name: Required.
// Phone Number: Required. Must be a 10 digit number formatted like: 999-888-9898
// Reference the addpost route for an example.
// STRETCH: Hook up a database that you insert these values into after you've
// validated them.
// REMINDER: Don't store passwords in plain text.. Make sure you hash it first!

router.get('/', (req, res) => {
  // Handle initial rendering here.
  res.render('signup', {
    hasError: false,
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
  });
});

function checkRequired(info, req) {
  for (const item in req.body) {
    info[item] = req.body[item];
    if (req.body[item].length <= 0) {
      if (!info.error[item]) {
        info.error[item] = [];
      }
      info.hasError = true;
      info.error[item].push({ message: `${item} is required.` });
    }
  }
}

function checkUsername(info, req) {
  // Must be more than 6 characters, must start with a letter,
  // and no punctuation.
  const str = req.body.username;
  let sixChar = false;
  let start = false;
  let noPunct = false;
  if (str.length >= 6) {
    sixChar = true;
  }
  if (str.match(/^[a-zA-Z]/)) {
    start = true;
  }
  if (str.match(/[a-zA-Z0-9]/g)) {
    noPunct = true;
  }

  if (sixChar && start && noPunct) {
    info.username = req.body.username;
  } else {
    if (!info.error.username) {
      info.error.username = [];
    }
    info.hasError = true;
    info.error.username.push({ message: 'invalid username' });
  }
}

function checkEmail(info, req) {
  const str = req.body.email;
  let atFound = false;
  let dotFound = false;

  for (let i = 0; i < str.length; i++) {
    // check for @ and . in email
    if (str[i] === '@' || atFound) {
      if (atFound && str[i] === '.') {
        dotFound = true;
      }
      atFound = true;
    }
  }
  if (atFound && dotFound) {
    info.email = req.body.email;
  } else {
    if (!info.error.email) {
      info.error.email = [];
    }
    info.hasError = true;
    info.error.email.push({ message: 'invalid email' });
  }
}


function checkPassword(info, req) {
  // Must be more than 8 characters with atleast One letter,
  // one number, and one special character (!?/.,')
  const str = req.body.password;
  let eightChar = false;
  let letter = false;
  let number = false;
  let special = false;
  // const atLeastOne = false;
  if (str.length >= 8) {
    eightChar = true;
  }
  if (str.match(/[a-zA-Z]/g)) {
    letter = true;
  }
  if (str.match(/[0-9]/g)) {
    number = true;
  }
  if (str.match(/[(!?/.,')]/g)) {
    special = true;
  }
  if (eightChar && letter && number && special) {
    info.password = req.body.password;
  } else {
    if (!info.error.password) {
      info.error.password = [];
    }
    info.hasError = true;
    info.error.password.push({ message: 'invalid password' });
  }
}

function checkPhone(info, req) {
  // Must be a 10 digit number formatted like: 999-888-9898
  const str = req.body.phone;
  let goodNum = false;

  if (str.match(/^[2-9]\d{2}-\d{3}-\d{4}/)) {
    goodNum = true;
  }
  if (goodNum) {
    info.phone = req.body.phone;
  } else {
    if (!info.error.phone) {
      info.error.phone = [];
    }
    info.hasError = true;
    info.error.phone.push({ message: 'invalid phone' });
  }
}

function checkSignup(req) {
  let info = {};
  info.hasError = false;
  info.error = {};

  // perform required checks
  checkRequired(info, req);
  checkUsername(info, req);
  checkEmail(info, req);
  checkPassword(info, req);
  checkPhone(info, req);

  return info;
}

router.post('/', (req, res) => {
  // Handle rendering / redirecting here.
  const signup = checkSignup(req);

  if (!signup.hasError) {
    // If there arent any validation errors, redirect to '/'
    res.redirect('/');
  } else {
    // If there are validation errors, re-render the signup page,
    // injecting the users previous inputs.
    res.render('signup', signup);
    // {
    //   username: signup.username,
    //   password: signup.password,
    //   email: signup.email,
    //   firstname: signup.firstname,
    //   lastname: signup.lastname,
    //   phone: signup.phone,
    // });
  }
});


// PRO-TIP: Write ALOT of functions to help you handle each little piece.

module.exports = router;
