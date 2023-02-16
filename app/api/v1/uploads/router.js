const express = require('express');
const multer = require('multer');
const router = express();
const { authenticateUser } = require('../../../middlewares/auth');
const uploadMiddleware = require('../../../middlewares/multer');
const { upload } = require('./controller');

router.post('/uploads', authenticateUser, uploadMiddleware.single('image'), upload);

module.exports = router;
