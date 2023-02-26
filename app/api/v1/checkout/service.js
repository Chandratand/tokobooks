const { Transaction, DetailTransaction, Book } = require('../../../db/models');
const { Op } = require('sequelize');
const { NotFoundError } = require('../../../errors');

const createTransaction = async (req, t) => {
  const { payload } = req.body;
  const user = req.user.id;

  const transaction = await Transaction.create(
    {
      invoice: `T-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date(),
      user: user,
    },
    { transaction: t }
  );

  let errorBookIdNotFound = [],
    errorBookIdStock = [],
    updateStock = [];

  for (let i = 0; i < payload.length; i++) {
    const checkingBook = await Book.findOne({ where: { id: payload[i].bookId, user: user } });

    // add field create detail transaction
    payload[i].transaction = transaction.id;
    payload[i].titleBook = checkingBook?.title;
    payload[i].user = user;
    payload[i].book = checkingBook?.id;
    payload[i].imageBook = checkingBook?.image;
    payload[i].priceBook = checkingBook?.price;

    updateStock.push({
      id: payload[i].bookId,
      stock: checkingBook?.stock - payload[i].quantity,
      user: user,
    });

    if (payload[i].quantity > checkingBook?.stock) {
      errorBookIdStock.push(`${payload[i].quantity} - ${checkingBook?.stock}`);
    }

    if (!checkingBook) {
      errorBookIdNotFound.push(payload[i].bookId);
    }
  }

  if (errorBookIdStock.length !== 0) {
    throw new Error(`Book stock is not enough with id : ${errorBookIdStock.join(', ')} and user : ${user}`);
  }
  if (errorBookIdNotFound.length !== 0) {
    throw new NotFoundError(`No books with id : ${errorBookIdNotFound.join(', ')} and user : ${user}`);
  }

  await Book.bulkCreate(
    updateStock,
    {
      updateOnDuplicate: ['stock'],
    },
    { transaction: t }
  );

  const detailTransaction = await DetailTransaction.bulkCreate(payload, { transaction: t });

  const result = {
    ...transaction.dataValues,
    detailTransaction: null,
  };
  result.detailTransaction = detailTransaction.map((item) => ({ ...item.dataValues }));

  await t.commit();

  return result;
};

module.exports = {
  createTransaction,
};
