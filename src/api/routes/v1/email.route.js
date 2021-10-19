const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/email.controller');
const { checkEmail } = require('../../validations/email.validation');

const router = express.Router();

router
  .route('/')
  /**
   * @api {post} v1/check Check Email
   * @apiDescription Check Email for various issues
   * @apiVersion 1.0.0
   * @apiName Check
   * @apiGroup Email
   * @apiPermission user
   *
   * @apiParam  {String}             email          Email
   *
   * @apiSuccess (Created 201) {Object}   results   Email validation result
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   */
  .post(validate(checkEmail), controller.check);

module.exports = router;
