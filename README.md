# Account Management and Fund Transfer API

This is a RESTful API built using Node.js and Express that allows users to manage accounts and perform fund transfers between them. The API stores accounts and transactions in memory for simplicity, focusing on basic account management and transaction handling without database persistence.

### Features
Create Account: Create a new account with a specified initial balance.<br>
Transfer Funds: Transfer funds between two accounts.

### Technologies Used
Node.js: JavaScript runtime <br>
Express: Web framework for building APIs <br>
Jest: Testing framework <br>
In-memory storage: No database is used; all data is stored temporarily in memory <br>

### Installation
1. Clone the repository:
```

clone https://github.com/Isini09/fund-transfer-API.git


```
   
3. Navigate into the project directory:
```

 cd network-automation-api


```
  
5. Install dependencies:
```

npm install


```
4. Start the application:
   
```

npm run server


```
### API Endpoints
#### 1. Create Account => POST /api/accounts
Request Body(json): (Always create two accounts before transfering funds)

```
{
  "accountNumber": "123456",
  "initialBalance": 2000
}
```
#### 2. Transfer Funds => POST /api/transfer
Request Body(json):

```
{
  "sourceAccountNumber": "123456",
  "destinationAccountNumber": "123457",
  "amount": 100
}
```
### Testing
```

npm test


```


## Thank you.
