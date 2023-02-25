const { Book, Category } = require('../../../db/models');
const { NotFoundError } = require('../../../errors');
const { Op } = require('sequelize');

const getAllBooks = async (req) => {
  const { title = '', category = '' } = req.query;

  let condition = {
    user: req.user.id,
  };

  if (title !== '') {
    condition = {
      ...condition,
      title: {
        [Op.like]: `%${title}%`,
      },
    };
  }
  if (category !== '') {
    condition = {
      ...condition,
      category: category,
    };
  }

  const result = await Book.findAll({
    where: condition,
    include: {
      model: Category,
      attributes: ['id', 'name'],
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'category'],
    },
  });

  return result;
};

const getOneBooks = async (req) => {
  const { id } = req.params;
  const result = await Book.findByPk(id, {
    include: {
      model: Category,
      attributes: ['id', 'name'],
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'category'],
    },
  });

  return result;
};

const createBooks = async (req) => {
  const { title, price, author, category, published, stock, image } = req.body;
  let user = req.user.id;

  const checkCategory = await Category.findOne({ where: { id: category, user: user } });

  if (!checkCategory) {
    throw new NotFoundError('id Category not found');
  }

  const result = await Book.create({
    title,
    user: user,
    price,
    author,
    category,
    published,
    stock,
    image,
  });

  return result;
};

const updateBooks = async (req) => {
  const { title, price, author, category, published, stock, image } = req.body;
  const { id } = req.params;
  let user = req.user.id;

  const checkCategory = await Category.findOne({ where: { id: category, user: user } });

  if (!checkCategory) {
    throw new NotFoundError('id Category not found');
  }

  const checkBooks = await Book.findOne({ where: { id: id } });

  if (!checkBooks) {
    throw new NotFoundError('id book not found');
  }

  const result = await checkBooks.update({
    title,
    user: user,
    price,
    author,
    category,
    published,
    stock,
    image,
  });

  return result;
};

const deleteBooks = async (req) => {
  const { id } = req.params;

  const checkBook = await Book.findOne({
    where: {
      id: id,
    },
  });

  // jika id result false / null maka akan menampilkan error `Tidak ada Kategori dengan id` yang dikirim client
  if (!checkBook) throw new NotFoundError(`Tidak ada Books dengan id :  ${id}`);

  const result = checkBook.destroy();

  return result;
};

module.exports = {
  getAllBooks,
  createBooks,
  updateBooks,
  deleteBooks,
  getOneBooks,
};
