const express = require('express');
const router = express.Router();
const {auth} = require('../middlewares/auth.middleware');

// @description: this route is only accessible for authorized users
router.get('/auth-required', auth, async (req, res) => {
  return res.send('you have been authorized!')
});

module.exports = router;
