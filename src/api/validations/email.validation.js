const Joi = require('joi');

module.exports = {

  // POST /v1/check
  checkEmail: {
    body: {
      email: Joi.string().email().required(),
    },
  },
};
