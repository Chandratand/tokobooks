const { signin, signup } = require('./service');
const { StatusCodes } = require('http-status-codes');

const signinCMS = async (req, res, next) => {
  try {
    const result = await signin(req);
    res.status(StatusCodes.CREATED).json({
      message: 'Signin Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const signupUser = async (req, res, next) => {
  try {
    const result = await signup(req);
    res.status(StatusCodes.CREATED).json({
      message: 'Signup Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signinCMS,
  signupUser,
};
