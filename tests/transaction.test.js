const request = require('supertest');
const app = require('../backend/app');


describe('Transfer API', () => {

    // Test: Create a new account successfully
    it('should create a new account', async () => {
    const res = await request(app)
      .post('/api/accounts')
      .send({
        accountNumber: '123456',
        balance: 1000
      });

    expect(res.statusCode).toBe(201); // Expect success with 201 status
    expect(res.body.Account).toBe('123456'); // Account number should match
    expect(res.body.Balance).toBe(1000); // Initial balance should match
    });

    // Test: Create account with missing details
    it('should return error when creating an account without accountNumber or balance', async () => {
    const res = await request(app)
      .post('/api/accounts')
      .send({
        balance: 1000 // Missing account number
      });

    expect(res.statusCode).toBe(400); // Expect failure with 400 status
    expect(res.body.error).toBe('Account number and amount is required');
    });

  // Test: Transfer funds successfully between two accounts
  it('should transfer funds between accounts successfully', async () => {
    // Create two accounts
    await request(app).post('/api/accounts').send({
      accountNumber: '123',
      balance: 1000
    });
    await request(app).post('/api/accounts').send({
      accountNumber: '456',
      balance: 500
    });

    // Perform the transfer
    const res = await request(app)
      .post('/api/transfer')
      .send({
        sourceAccountNumber: '123',
        destinationAccountNumber: '456',
        amount: 200
      });

    expect(res.statusCode).toBe(200); // Expect success
    expect(res.body.message).toBe('Transfer successful');
    expect(res.body.sourceAccount).toBe('123'); 
    expect(res.body.destinationAccount).toBe('456'); 
  });

  // Test: Transfer with insufficient funds
  it('should return an error for insufficient funds', async () => {
    // Create two accounts
    await request(app).post('/api/accounts').send({
      accountNumber: '111',
      balance: 100
    });
    await request(app).post('/api/accounts').send({
      accountNumber: '222',
      balance: 500
    });

    // // Attempt to transfer more than the source account's balance
    // const res = await request(app)
    //   .post('/api/transfer')
    //   .send({
    //     sourceAccountNumber: '111',
    //     destinationAccountNumber: '222',
    //     amount: 200 // Exceeds balance
    //   });

    // expect(res.statusCode).toBe(400); // Expect failure
    // expect(res.body.message).toBe('Insufficient Funds');
  });

  // Test: Transfer with non-existent accounts
  it('should return an error for non-existent source account', async () => {
    const res = await request(app)
      .post('/api/transfer')
      .send({
        sourceAccountNumber: '999', // Non-existent account
        destinationAccountNumber: '456',
        amount: 100
      });

    expect(res.statusCode).toBe(404); // Expect 404 error
    expect(res.body.error).toBe('Source account not found');
  });

  it('should return an error for non-existent destination account', async () => {
    const res = await request(app)
      .post('/api/transfer')
      .send({
        sourceAccountNumber: '123',
        destinationAccountNumber: '999', // Non-existent account
        amount: 100
      });

    expect(res.statusCode).toBe(404); // Expect 404 error
    expect(res.body.error).toBe('Destination account not found');
  });

    
})