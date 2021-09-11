import express from 'express';

import { handler } from '../controllers/handler';

const router = express.Router();

router.route('/starter').get(handler);

export { router as starterRouter };
