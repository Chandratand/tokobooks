const { BadRequestError } = require('../../../errors');

const uploadImage = async (req) => {
  if (!req.file) throw new BadRequestError('No file Uploaded');

  console.log('Hello ', req.file.filename);
  const result = { src: `/uploads/${req.file.filename}` };
  return result;
};

module.exports = {
  uploadImage,
};
