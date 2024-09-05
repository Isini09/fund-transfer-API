const accounts = {}; //In memory storage for accounts
const transactionLog = []; //In memory transaction log

//Function to create a new account
const createAccount = (accountNumber, balance) => {
    //Error for when account already exists
    if(accounts[accountNumber]){                    
        throw new Error('Account already exists');
    }

    const account = {accountNumber, balance};
    accounts[accountNumber] = accountNumber;
    return account;
};

//Function to get an account by number
const getAccount = (accountNumber) => {
    if (!accounts[accountNumber]){
        throw new Error('Account not found');
    }

    return accounts[accountNumber];
}

//Function to update an account balance
const updateAccountBalance = (accountNumber, newBalance) => {
    if (!accounts[accountNumber]){
        throw new Error('Invalid account Number');
    }
    accounts[accountNumber].balance = newBalance;
};

//Function to check if an account exists
const accountExists = (accountNumber) => {
    return !!accounts[accountNumber];
};



module.exports = {
    createAccount, 
    getAccount, 
    updateAccountBalance, 
    accountExists
};
