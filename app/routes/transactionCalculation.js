import { Router } from 'express';
import catchErrors from 'async-error-catcher'
import TransactionController from '../controllers/TransactionCalculationController';

const trasactionController = new TransactionController();
const router = new Router();

router.post('/transaction-matrix', catchErrors(trasactionController.transactionMatrix));
router.post('/witholding-tax', catchErrors(trasactionController.withholdingTax));
router.post('/vat-tax', catchErrors(trasactionController.Vat));
router.post('/discounts', catchErrors(trasactionController.discountedProducts));
router.post('/date-calculations', catchErrors(trasactionController.dateCalculations));


router.use((error, req, res, next) => {
if (error.type === 'ValidationError') {
    return res.status(422).jsend.fail({ errors: error.errors})
  };
  if (error.errors.amount) {
    return res.status(400).jsend.fail({
      message: error.errors.amount.message,
      field: 'amount'
    })
  };

  res.status(500).jsend.error({
    message: 'Something went wrong on the server.'
  });
});

export default router;