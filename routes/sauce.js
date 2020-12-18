const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.get('/sauces', sauceCtrl.getAllSauces);
router.post('/sauces', multer, sauceCtrl.createSauce);
router.get('/sauces/:id', sauceCtrl.getOneThing);
router.put('/sauces/:id', sauceCtrl.modifySauce);
router.delete('/sauces/:id', sauceCtrl.deleteSauce);

module.exports = router;