const express = require('express');
const { getWalletBalance, addWalletBalance } = require('../controllers/walletController');

const router = express.Router();

router.get('/:id', getWalletBalance);

router.put('/:id', addWalletBalance);






module.exports = router;