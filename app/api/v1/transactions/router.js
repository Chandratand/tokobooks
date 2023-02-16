const express = require('express');
const { read, readDetailTransaction } = require('./controller');
const router = express();
const { authenticateUser } = require('../../../middlewares/auth');

router.get('/transactions', authenticateUser, read);
router.get('/transactions/:id', authenticateUser, readDetailTransaction);

module.exports = router;
