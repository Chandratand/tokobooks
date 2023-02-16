const { Transaction, DetailTransaction } = require('../../../db/models');
const { NotFoundError } = require('../../../errors');
const { Op } = require('sequelize');

const getAllTransaction = async (req) => {
  const { invoice = '' } = req.query;

  let condition = {
    user: req.user.id,
  };

  if (invoice !== '') {
    condition = {
      ...condition,
      invoice: {
        [Op.like]: `%${invoice}%`,
      },
    };
  }

  const result = await Transaction.findAll({
    where: condition,
    include: {
      model: DetailTransaction,
      as: 'detailTransaction',
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });

  return result;
};

const getDetailTransaction = async (req) => {
  const { id } = req.params;

  const result = await Transaction.findOne({
    where: { id },
    include: {
      model: DetailTransaction,
      as: 'detailTransaction',
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });

  return result;
};

module.exports = {
  getAllTransaction,
  getDetailTransaction,
};
