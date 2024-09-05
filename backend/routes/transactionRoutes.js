const express = require('express')
const router = express.Router()
const { createAccountController , getAccountController, transferFunds } = require('../controllers/transactionController');

//@desc     Create a new account
//@route    POST /api/accounts
router.post('/accounts', createAccountController);

//@desc     Get account Details
//@route    GET /api/accounts/:accountNumber
router.get('/accounts/:accountNumber', getAccountController);

//@desc     To transfer funds
//@route    POST /api/transfer
router.post('/transfer', transferFunds);




module.exports = router;