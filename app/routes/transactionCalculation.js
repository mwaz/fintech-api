import { Router } from 'express';
import passport from 'passport';
import catchErrors from 'async-error-catcher'
import TransactionController from '../controllers/TransactionCalculationController';

const authenticatedRoutes = passport.authenticate("jwt", {session: false} );
const trasactionController = new TransactionController();
const router = new Router();

router.post('/transaction-matrix', authenticatedRoutes, catchErrors(trasactionController.transactionMatrix));
router.post('/witholding-tax', authenticatedRoutes, catchErrors(trasactionController.withholdingTax));
router.post('/vat-tax', authenticatedRoutes, catchErrors(trasactionController.Vat));
router.post('/discounts', authenticatedRoutes, catchErrors(trasactionController.discountedProducts));
router.post('/date-calculations', authenticatedRoutes, catchErrors(trasactionController.dateCalculations));
router.get('/', authenticatedRoutes, catchErrors(trasactionController.queryAllTransactions));


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