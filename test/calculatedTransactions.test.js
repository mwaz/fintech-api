'use strict';
import app from '../index';
import chai from 'chai';
import request from 'supertest';
import authData from './support/test-data/auth';
import calculatedTransactions from './support/test-data/calculatedTransactions';
import chaiHttP  from 'chai-http';
chai.use(chaiHttP);
const api = new request(app);
const expect = chai.expect;
const should = chai.should();
const baseUrl = '/fintech/api'

const authenticatedUser = request.agent(app);

const userAuthentication = async() => {
   await authenticatedUser.post(`${baseUrl}/users/signup`)
    .send(authData.userRegistration)
   const login = await authenticatedUser.post(`${baseUrl}/users/login`)
    .send(authData.userLogin)
return login.body.data.token
}


describe('Calculated Transactions : /transactions/calculations', function(){
      describe('POST /transactions/calculations', function(){
          it('Can calculate cost from the transaction matrix provided', async() => {
            const transaction = await api
            .post(`${baseUrl}/transactions/calculations/transaction-matrix`)
            .set('Authorization', await userAuthentication())
            .send(calculatedTransactions.amountPositive)
            .set('Accept', 'application/json')
            expect(transaction.status).to.be.eql(201);
            expect(transaction.body.status).to.be.eql('success');
            expect(transaction.body.data.transaction).to.have.property('_id');
            expect(transaction.body.data.transaction.transactionType).to.be.eql('transaction-matrix');
          });

          it('Can calculate withholding-tax given amount', async() => {
            const transaction = await api
            .post(`${baseUrl}/transactions/calculations/witholding-tax`)
            .set('Authorization', await userAuthentication())
            .send(calculatedTransactions.amountTaxPositive)
            .set('Accept', 'application/json')
            expect(transaction.status).to.be.eql(201);
            expect(transaction.body.status).to.be.eql('success');
            expect(transaction.body.data.transaction).to.have.property('_id');
            expect(transaction.body.data.transaction.transactionType).to.be.eql('withholding-tax');
          });

          it('Can calculate VAT-tax given amount', async() => {
            const transaction = await api
            .post(`${baseUrl}/transactions/calculations/vat-tax`)
            .set('Authorization', await userAuthentication())
            .send(calculatedTransactions.amountPositive)
            .set('Accept', 'application/json')
            expect(transaction.status).to.be.eql(201);
            expect(transaction.body.status).to.be.eql('success');
            expect(transaction.body.data.transaction).to.have.property('_id');
            expect(transaction.body.data.transaction).to.have.property('taxedTotal');
            expect(transaction.body.data.transaction.transactionType).to.be.eql('VAT-tax');
          });

          it('Can calculate Discounts given amount', async() => {
            const transaction = await api
            .post(`${baseUrl}/transactions/calculations/discounts`)
            .set('Authorization', await userAuthentication())
            .send(calculatedTransactions.discountedAmount)
            .set('Accept', 'application/json')
            expect(transaction.status).to.be.eql(201);
            expect(transaction.body.status).to.be.eql('success');
            expect(transaction.body.data.transaction).to.have.property('_id');
            expect(transaction.body.data.transaction.transactionType).to.be.eql('discounted-items');
          });

          it('Can calculate different date permutations', async() => {
            const transaction = await api
            .post(`${baseUrl}/transactions/calculations/date-calculations`)
            .set('Authorization', await userAuthentication())
            .send(calculatedTransactions.sampleDate)
            .set('Accept', 'application/json')
            expect(transaction.status).to.be.eql(201);
            expect(transaction.body.status).to.be.eql('success');
            expect(transaction.body.data.transaction).to.have.property('numberOfDaysLeftInMonth');
            expect(transaction.body.data.transaction).to.have.property('numberOfMonthsLeftInYear');
            expect(transaction.body.data.transaction).to.have.property('numberOfDaysLeftInYear');
            expect(transaction.body.data.transaction.transactionType).to.be.eql('date-calculation');
          })

    });
});
