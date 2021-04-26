const express = require('express');
const router = express.Router();

// home route
router.get('/', async (req, res) => {
  res.send('welcome')
});

module.exports = router;
