const { User } = require('../../../db/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({
      where: { email: email },
    });

    if (checkUser) {
      const checkPassword = bcrypt.compareSync(password, checkUser.password);

      if (checkPassword) {
        res.status(200).json({
          message: 'signin berhasil',
        });
      } else {
        res.status(403).json({
          message: 'Invalid Creadential',
        });
      }
    } else {
      res.status(403).json({
        message: 'Invalid Creadential',
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  signin,
};
