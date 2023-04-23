import express, { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);

export { router as authRoute };
