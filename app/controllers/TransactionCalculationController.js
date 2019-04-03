'use strict'

import Controller from './index';
import TransactionCalculation from '../models/TransactionCalculation';
import moment from 'moment';


export default class TransactionCalculationController extends Controller {
      async transactionMatrix ({ body }, res) {
        await super.validate(body, {
          amount: 'required|number',
        });
    
        const { amount }  = body;
        let cost = 0;

        const calculateTransactionCost = (amount) => {
          if(amount > 0 && amount <101){
            return cost = 0
          }
          if(amount > 100 && amount <501){
            return cost = 11
          }
          if(amount > 500 && amount <1001){
            return cost = 15
          }
          if(amount > 1000 && amount <1501){
            return cost = 25
          }
          if(amount < 0 ){
            return res.status(400).jsend.fail({ message: 'Oops! invalid amount' })
          }
        }

        const newTransaction = await TransactionCalculation.create({
            amount,
            cost: calculateTransactionCost(amount),
            transactionType: 'transaction-matrix'
        });
        return res.status(201).jsend.success({ transaction: newTransaction })
      }

      async withholdingTax ({ body }, res) {
        await super.validate(body, {
          amount: 'required|number',
        });
    
        const { amount }  = body;
        

        const calculateWitheldTax = (amount) => {
          if(amount < 0 ){
            return res.status(400).jsend.fail({ message: 'Oops! invalid amount' })
          }
          const witheldAmount = amount-(0.95*amount)
          return witheldAmount
         
        }

        const newTransaction = await TransactionCalculation.create({
            amount,
            withheldTax: calculateWitheldTax(amount),
            transactionType: 'withholding-tax'
        });
        return res.status(201).jsend.success({ transaction: newTransaction })
      }

      async Vat ({ body }, res) {
        await super.validate(body, {
          amount: 'required|number',
        });
    
        const { amount }  = body;
        

        const calculateVat = (amount) => {
          if(amount < 0 ){
            return res.status(400).jsend.fail({ message: 'Oops! invalid amount' })
          }
          const totalAmount = amount+(0.16*amount)
          return totalAmount
         
        }

        const newTransaction = await TransactionCalculation.create({
            amount,
            taxedTotal: calculateVat(amount),
            transactionType: 'VAT-tax'
        });
        return res.status(201).jsend.success({ transaction: newTransaction })
      }

      async discountedProducts ({ body }, res) {
        await super.validate(body, {
          amount: 'required|number',
          discount: 'required|number',
        });
    
        const { amount, discount }  = body;
        

        const calculateDiscount = (amount) => {
          if(amount < 0 ){
            return res.status(400).jsend.fail({ message: 'Oops! invalid amount' })
          }
          const discountedAmount = amount-((discount/100)*amount)
          return discountedAmount
         
        }

        const newTransaction = await TransactionCalculation.create({
            amount,
            discount: calculateDiscount(amount),
            transactionType: 'discounted-items'
        });
        return res.status(201).jsend.success({ transaction: newTransaction })
      }

      async dateCalculations ({ body }, res) {
        await super.validate(body, {
          date: 'required|date',
        });
    
        const { date }  = body;
        

        const calculateMonths = (date) => {
            const currentDate = moment().format(date)
            const currentMonth = new Date(currentDate).getMonth();
            const remainingMonths = 12 - (currentMonth + 1);
            return Math.floor(remainingMonths)
        }

        const calculateYearlyDays = (date) => {
            const time = new Date(date);
            const oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            const currentDate = new Date(date);
            const endYear = new Date(time.getFullYear(),11,31);
            var remainingDays = Math.round(Math.abs((currentDate.getTime() - endYear.getTime())/(oneDay)));
            return remainingDays
        }

        const calculateMonthlyDays = (date) => {
            const time = new Date(date);
            const currentDate  = time.getDate();
            const allDays = new Date(time.getFullYear(), time.getMonth()+1, 0).getDate();
           const remainingDays = allDays-currentDate
           return remainingDays
        }

        const newTransaction = await TransactionCalculation.create({
            numberOfDaysLeftInMonth: calculateMonthlyDays(date),
            numberOfMonthsLeftInYear: calculateMonths(date),
            numberOfDaysLeftInYear: calculateYearlyDays(date),
            transactionType: 'date-calculation'
        });
        return res.status(201).jsend.success({ transaction: newTransaction })
      }
    
}