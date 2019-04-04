'use strict'

import Controller from './index';
import Transaction from '../models/TransactionModel'
import perf from 'execution-time'
let performance = perf();



export default class InterestController extends Controller {
    async compoundInterest ({ body }, res) {
        await super.validate(body, {
          principle: 'required|number',
          period: 'required|number',
          rates: 'required|number',
          frequencyOfApplyingInterest: 'required|number'
        });
      
        performance.start();

        const { principle, period, rates, frequencyOfApplyingInterest }  = body;

        const calculateInterest = () => {
          const compoundingFrequency = 12/period;
          const interestRates = rates/100
          const duration = 1 + (interestRates/compoundingFrequency);
          const compoundAmount = Math.pow(duration, (compoundingFrequency*frequencyOfApplyingInterest))
          const amount = principle * compoundAmount;
          const interest = amount - principle
          return interest
        }
        const completedTime =  performance.stop();

        const newTransaction = await Transaction.create({
          principle,
            period,
            rates,
            interest: calculateInterest(),
            executionTime: completedTime.time,
            transactionType: 'compound-interest'
        });
        return res.status(201).jsend.success({ transaction: newTransaction })
      }

      async simpleInterest ({ body }, res) {
        await super.validate(body, {
          principle: 'required|number',
          period: 'required|number',
          rates: 'required|number',
        });
    
        performance.start();
        const { principle, period, rates }  = body;

        const calculateInterest = () => {
          const time = period/12;
          const interestRates = rates/100
          const interest = principle * interestRates * time;
          return interest
        }
        
        const completedTime =  performance.stop();
        const newTransaction = await Transaction.create({
          principle,
            period,
            rates,
            interest: calculateInterest(),
            executionTime: completedTime.time,
            transactionType: 'simple-interest'
        });
        return res.status(201).jsend.success({ transaction: newTransaction })
      }
    
}