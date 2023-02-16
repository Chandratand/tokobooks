const { StatusCodes } = require('http-status-codes');
const { getAllTransaction, getDetailTransaction } = require('./service');

const read = async (req, res, next) => {
  try {
    const result = await getAllTransaction(req);

    res.status(StatusCodes.OK).json({
      message: 'Get Transaction success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const readDetailTransaction = async (req, res, next) => {
  try {
    const result = await getDetailTransaction(req);

    res.status(StatusCodes.OK).json({
      message: 'Get Transaction success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  read,
  readDetailTransaction,
};
