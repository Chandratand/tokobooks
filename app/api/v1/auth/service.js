const { User } = require('../../../db/models');
const { BadRequestError, UnauthorizedError } = require('../../../errors');
const { createJWT, createTokenUser } = require('../../../utils');
const bcrypt = require('bcryptjs');

const signin = async (req) => {
  const { email, password } = req.body;
  if (!email || !password) throw new BadRequestError('Please provide email and password');

  const result = await User.findOne({
    where: { email: email },
  });

  if (!result) throw new UnauthorizedError('Invalid Credentials');

  const isPasswordCorrect = bcrypt.compareSync(password, result.password);

  if (!isPasswordCorrect) throw new UnauthorizedError('Invalid Credentials');

  const token = createJWT({ payload: createTokenUser(result) });

  return { token, id: result.id, role: result.role, email: result.email };
};
const signup = async (req) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) throw new BadRequestError("Password doesn't match");

  const checkEmail = await User.findOne({
    where: { email: email },
  });
  console.log('checkEmail');
  console.log(email);
  console.log(checkEmail);

  if (checkEmail) throw new BadRequestError('Email registered');

  const user = await User.create({ name, email, password: bcrypt.hashSync(password, 10), role: 'admin' });

  delete user.dataValues.password;

  return { user };
};

module.exports = { signin, signup };
