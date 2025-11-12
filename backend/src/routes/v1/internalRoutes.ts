import { Router } from 'express';
import * as recordController from '@/api/v1/internal/record/controller';

const router = Router();

// Record routes
router.post('/record', recordController.postHandler);

export default router;
