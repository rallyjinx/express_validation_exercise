

const express = require('express');
const router = express.Router();
const ev = require('express-validation');
const validations = require('../validations/users');

// Write your form and validations inside this route file.
// Add form validations in /signup for:
// Username: Required. Must be more than 6 characters, must start with a letter, and no punctuation.
// Password: Required. Must be more than 8 characters with atleast One letter, one number, and one special character (!?/.,')
// Email: Required. Must be formatted like an email, (something @ something . something)
// First Name: Required.
// Last Name: Required.
// Phone Number: Required. Must be a 10 digit number formatted like: 999-888-9898
// Reference the addpost route for an example.
// STRETCH: Hook up a database that you insert these values into after you've validated them.
// REMINDER: Don't store passwords in plain text.. Make sure you hash it first!

router.get('/', (req, res) => {
  // Handle initial rendering here.
  res.render('signup', {});
});
//
router.post('/', ev(validations.post), (req, res) => {
  // if errors redirect to /
  // still don't know how to get the errors
  // out of Joi but they're displaying on the
  // page via the error app.use in index.js
  // if valid render signup
  res.render('signup');
});


// PRO-TIP: Write ALOT of functions to help you handle each little piece.

module.exports = router;
