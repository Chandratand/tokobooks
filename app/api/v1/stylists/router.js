const express = require('express');
const router = express();
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

router.get('/stylists', authenticateUser, authorizeRoles('admin'), (req, res) => {
  res.status(200).json({
    message: 'stylists Route',
  });
});

module.exports = router;
