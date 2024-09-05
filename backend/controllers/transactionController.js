const {createAccount, getAccount, updateAccountBalance, accountExists} = require('../models/accountModel');

//@desc Create a new account
//@route POST /api/accounts
const createAccountController = (req, res) => {
    try{
        const{accountNumber, balance} = req.body;
        if(!accountNumber || balance === undefined){
            return res.status(400).json({error: 'Account number and amount is required'});
        }
        const account = createAccount(accountNumber, balance);
        return res.status(201).json({
            message: 'Account created successfully',
            Account: accountNumber,
            Balance: balance,
        });

        
    }catch(error){
        res.status(400).json({error: error.message});
    }
    
};

//@desc Get account details
//@route GET /api/accounts/:accountNumber
const getAccountController = (req,res) => {
    try{
        const {accountNumber} = req.params;
        const account = getAccount(accountNumber);
        res.status(200).json(account);
    }catch (error){
        res.status(404).json({error: error.message});
    }
};

//@desc Transfer funds between accounts
//@routes Post /api/transfer
const transferFunds = (req, res) => {
    const {sourceAccountNumber, destinationAccountNumber, amount} = req.body;

    //Validate input
    if (!sourceAccountNumber || !destinationAccountNumber|| amount === undefined){
        return res.status(400).json({error: 'Amount and Source & Destination accounts are required'});
    }

    //Convert amount to a number
    const transferAmount = parseFloat(amount);
    if(isNaN(transferAmount) || transferAmount <= 0){
        return res.status(400).json({error: 'Invalid transfer amount'});
    }

    //Check if source and destination accounts exist

    if(!accountExists(sourceAccountNumber)){
        return res.status(404).json({error: 'Source account not found'});
    }
    if(!accountExists(destinationAccountNumber)){
        return res.status(404).json({error: 'Destination account not found'});
    }

    // //Check if the source account has sufficient funds
    // const sourceAccount = getAccount(sourceAccountNumber);
    // const destinationAccount = getAccount(destinationAccountNumber);

    // if (sourceAccount.balance < transferAmount){
    //     return res.status(400).json({message: 'Insufficient Funds'});
    // }

    //Perform the transfer
    
    sourceAccount.balance -= transferAmount;
    destinationAccount.balance += transferAmount;


    //Return a success response
    return res.status(200).json({
        message: 'Transfer successful',
        sourceAccount: sourceAccount,
        destinationAccount: destinationAccount,
    });

    };


module.exports = { createAccountController, getAccountController, transferFunds };