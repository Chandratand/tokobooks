const express = require('express');
const { signinCMS, signupUser } = require('./controller');
const router = express();

router.post('/signin', signinCMS);
router.post('/signup', signupUser);

module.exports = router;
