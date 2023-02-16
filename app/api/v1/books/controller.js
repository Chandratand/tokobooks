const { StatusCodes } = require('http-status-codes');
const { getAllBooks, createBooks, updateBooks, deleteBooks } = require('./service');

const read = async (req, res, next) => {
  try {
    const result = await getAllBooks(req);

    res.status(StatusCodes.OK).json({
      message: 'Get books success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createBooks(req);
    res.status(StatusCodes.CREATED).json({
      message: 'Create books success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateBooks(req);

    res.status(StatusCodes.OK).json({
      message: 'Update Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteBooks(req);

    res.status(StatusCodes.OK).json({
      message: 'Delete Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  read,
  create,
  destroy,
  update,
};
