import { Router } from 'express';
import passport from 'passport';
import catchErrors from 'async-error-catcher'
import TransactionController from '../controllers/TransactionController';

const authenticatedRoutes = passport.authenticate("jwt", {session: false} );
const trasactionController = new TransactionController();
const router = new Router();

router.post('/compound-interest', authenticatedRoutes, catchErrors(trasactionController.compoundInterest));
router.post('/simple-interest', authenticatedRoutes, catchErrors(trasactionController.simpleInterest));



router.use((error, req, res, next) => {
if (error.type === 'ValidationError') {
    return res.status(422).jsend.fail({ errors: error.errors})
  };

  if (error.errors.principle) {
    return res.status(400).jsend.fail({
      message: error.errors.principle.message,
      field: 'principle'
    })
  };

  if (error.errors.rates) {
    return res.status(400).jsend.fail({
      message: error.errors.rates.message,
      field: 'rates'
    })
  };

  if (error.errors.period) {
    return res.status(400).jsend.fail({
      message: error.errors.period.message,
      field: 'period'
    })
  };

  res.status(500).jsend.error({
    message: 'Something went wrong on the server.'
  });
});

export default router;