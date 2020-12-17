const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

router.get('/sauces', sauceCtrl.testGet);

module.exports = router;