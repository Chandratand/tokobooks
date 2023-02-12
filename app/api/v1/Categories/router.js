const express = require('express');
const { getCategories, create, update, destroy } = require('./controller');
const router = express();
const { authenticateUser } = require('../../../middlewares/auth');

router.post('/categories', authenticateUser, create);
router.get('/categories', authenticateUser, getCategories);
router.put('/categories/:id', authenticateUser, update);
router.delete('/categories/:id', authenticateUser, destroy);

module.exports = router;
