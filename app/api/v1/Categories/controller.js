const { StatusCodes } = require('http-status-codes');
const { getAllCategories, createCategories, updateCategories, deleteCategories } = require('./service');

const getCategories = async (req, res, next) => {
  try {
    const result = await getAllCategories(req);

    res.status(StatusCodes.OK).json({
      message: 'Get category success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createCategories(req);
    res.status(StatusCodes.CREATED).json({
      message: 'Create category success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateCategories(req);

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
    const result = await deleteCategories(req);

    res.status(StatusCodes.OK).json({
      message: 'Delete Success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  create,
  destroy,
  update,
};
