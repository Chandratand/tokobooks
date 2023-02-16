const { Transaction, DetailTransaction, Book } = require('../../../db/models');
const { Op } = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../../../errors');
const { createTransaction } = require('./service');
const sequelize = require('../../../db/models').sequelize;
// fungsi sequelize ini nanti adala untuk ketika kita
// akan create dua tabel, jika tabel
// kedua tidak tercreate maka tabel pertama yang sudah di ccreate
// akan di roleback untuk mencegah transaction

const create = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const result = await createTransaction(req, t);

    res.status(StatusCodes.CREATED).json({
      message: 'Transaction Created',
      data: result,
    });
  } catch (error) {
    if (t) await t.rollback();
    next(error);
  }
};

module.exports = { create };
