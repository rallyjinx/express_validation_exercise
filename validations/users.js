'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    username: Joi.string()
      .label('username')
      .required()
      .min(6)
      .alphanum()
      .trim(),
    password: Joi.string()
      .label('password')
      .required()
      .trim()
      .regex(/^[a-zA-Z]/)
      .regex(/\d/)
      .regex(/^[,.]/) //see note
      .min(8),
    email: Joi.string()
      .label('email')
      .required()
      .email()
      .trim(),
    firstname: Joi.string()
      .label('firstname')
      .required()
      .trim(),
    lastname: Joi.string()
      .label('lastname')
      .required()
      .trim(),
    phone: Joi.string()
      .required()
      .regex(/^[2-9]\d{2}-\d{3}-\d{4}$/)
  }
};

// Password: Required. Must be more than 8 characters
// with atleast One letter, one number, and one special
// character (!?/.,')

 // .regex(/^[!?/.,']/)
 //this doesn't work because the form returns
 // &#x21;&#x3f;&#x5c;&#x5c;&#x2f;.,&#x27;
 // for !?/.,'

// Username: Required. Must be more than 6 characters,
// must start with a letter, and no punctuation.
// Email: Required. Must be formatted like an email,
// (something @ something . something)
// First Name: Required.
// Last Name: Required.
// Phone Number: Required. Must be a 10 digit number
// formatted like: 999-888-9898
// .regex(/^[!?/.,']/)
