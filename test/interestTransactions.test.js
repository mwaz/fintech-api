'use strict';
import app from '../index';
import chai from 'chai';
import request from 'supertest';
import authData from './support/test-data/auth';
import interestTransactions from './support/test-data/interestTransactions';
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


describe('Interest Transactions : /transactions', function(){
      describe('POST /transactions - Compound Interest ', async function(){
          it('Can calculate compound interest for an authenticated user', async() => {
            const transaction = await api
            .post(`${baseUrl}/transactions/compound-interest`)
            .set('Authorization', await userAuthentication())
            .send(interestTransactions.CompoundInterestPositive)
            .set('Accept', 'application/json')
            expect(transaction.status).to.be.eql(201);
            expect(transaction.body.data.transaction.principle).to.be.eql(interestTransactions.CompoundInterestPositive.principle);
            expect(transaction.body.data.transaction).to.have.property('_id');
            expect(transaction.body.data.transaction).to.have.property('interest');
          })

          it('Cannot calculate Compound Interest with invalid details', async() => {
            const transaction = await api
            .post(`${baseUrl}/transactions/compound-interest`)
            .set('Authorization', await userAuthentication())
            .send(interestTransactions.CompoundInterestInvalidDetails)
            .set('Accept', 'application/json')
            expect(transaction.status).to.be.eql(422);
            expect(transaction.body.status).to.be.eql('fail');
            expect(transaction.body.data.errors[0].message).to.contain('rates is required');
          })
       
    });

    describe('POST /transactions - Simple Interest ', async function(){
        it('Can calculate simple interest for an authenticated user', async() => {
          const transaction = await api
          .post(`${baseUrl}/transactions/simple-interest`)
          .set('Authorization', await userAuthentication())
          .send(interestTransactions.SimpleInterestPositive)
          .set('Accept', 'application/json')
          expect(transaction.status).to.be.eql(201);
          expect(transaction.body.data.transaction.principle).to.be.eql(interestTransactions.SimpleInterestPositive.principle);
          expect(transaction.body.data.transaction).to.have.property('_id');
          expect(transaction.body.data.transaction).to.have.property('interest');
        })

        it('Cannot calculate Simple Interest with invalid details', async() => {
          const transaction = await api
          .post(`${baseUrl}/transactions/simple-interest`)
          .set('Authorization', await userAuthentication())
          .send(interestTransactions.SimpleInterestInvalidDetails)
          .set('Accept', 'application/json')
          expect(transaction.status).to.be.eql(422);
          expect(transaction.body.status).to.be.eql('fail');
          expect(transaction.body.data.errors[0].message).to.contain('principle is required');
        })
     
  });
});
