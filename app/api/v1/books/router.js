const express = require('express');
const { read, create, update, destroy, readDetailBook } = require('./controller');
const router = express();
const { authenticateUser } = require('../../../middlewares/auth');

router.get('/books', authenticateUser, read);
router.get('/books/:id', authenticateUser, readDetailBook);
router.post('/books', authenticateUser, create);
router.put('/books/:id', authenticateUser, update);
router.delete('/books/:id', authenticateUser, destroy);

module.exports = router;
