import express from 'express';
import { authenticate } from '../middleware/auth';
import { PresenceController } from '../controllers/presence.controller';

const router: express.Router = express.Router();

router.use(authenticate);
router.get('/online', PresenceController.getOnline);

export default router;
