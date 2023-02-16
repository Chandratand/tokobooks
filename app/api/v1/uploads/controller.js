const { StatusCodes } = require('http-status-codes');
const { uploadImage } = require('./service');

const upload = async (req, res, next) => {
  try {
    const result = await uploadImage(req);

    res.status(StatusCodes.CREATED).json({
      message: 'SUccess Upload Image',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
};
