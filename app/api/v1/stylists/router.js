const express = require('express');
const router = express();

router.get('/stylists', (req, res) => {
  res.status(200).json({
    message: 'stylists Route',
  });
});

module.exports = router;
