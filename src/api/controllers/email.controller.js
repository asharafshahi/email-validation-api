const httpStatus = require('http-status');

const emailHelpers = require('../services/email');

const {
  checkIfDisposable,
  checkMisspelling,
  mxExists,
} = emailHelpers;

/**
 * Create new user
 * @public
 */
exports.check = async (req, res) => {
  try {
    const { email } = req.body;
    const { misspelled, autocorrect } = checkMisspelling(email);
    const [temp, mxexists, correctedExists] = await Promise.all([
      checkIfDisposable(email),
      mxExists(email),
      ...(autocorrect ? [mxExists(autocorrect)] : []),
    ]);

    res.status(httpStatus.OK);
    res.json({
      misspelled,
      autocorrect,
      temp,
      invalid: !mxexists,
      ...(autocorrect ? { correctedInvalid: !correctedExists } : {}),
    });
  } catch (error) {
    console.log(error);
  }
};
