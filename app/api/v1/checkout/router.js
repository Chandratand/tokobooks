const express = require('express');
const router = express();
const { authenticateUser } = require('../../../middlewares/auth');
const { create } = require('./controller');

router.post('/checkouts', authenticateUser, create);

module.exports = router;
