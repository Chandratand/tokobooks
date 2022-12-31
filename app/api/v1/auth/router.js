const express = require('express');
const { signin } = require('./controller');
const router = express();

router.post('/auth/signin', signin);

module.exports = router;
