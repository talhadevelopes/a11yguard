import express from 'express';
import { authenticate } from '../middleware/auth';
import { MessagesController } from '../controllers/messages.controller';

const router: express.Router = express.Router();

router.use(authenticate);
router.get('/group', MessagesController.getGroupHistory);
router.get('/dm/:peerMemberId', MessagesController.getDmHistory);

export default router;
