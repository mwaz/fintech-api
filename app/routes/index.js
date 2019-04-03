import { Router } from 'express';
import userRoutes from './userRoutes';
import transactionRoutes from './transactionRoutes';
import transactionCalculationRoutes from './transactionCalculation';


const router = Router();

router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);
router.use('/transactions/calculations', transactionCalculationRoutes);

export default router;