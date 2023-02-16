const { Category } = require('../../../db/models');
const { BadRequestError, NotFoundError } = require('../../../errors');

const getAllCategories = async (req) => {
  const result = await Category.findAll({
    where: {
      user: req.user.id,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });

  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;
  const result = await Category.create({
    name,
    user: req.user.id,
  });

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const checkCategory = await Category.findOne({
    where: {
      id: id,
      user: req.user.id,
    },
  });

  // jika id result false / null maka akan menampilkan error `Tidak ada Kategori dengan id` yang dikirim client
  if (!checkCategory) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  const result = checkCategory.update(
    {
      name,
    },
    {
      where: {
        id: id,
        user: req.user.id,
      },
    }
  );

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const checkCategory = await Category.findOne({
    where: {
      id: id,
      user: req.user.id,
    },
  });

  // jika id result false / null maka akan menampilkan error `Tidak ada Kategori dengan id` yang dikirim client
  if (!checkCategory) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  const result = checkCategory.destroy();

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  updateCategories,
  deleteCategories,
};
