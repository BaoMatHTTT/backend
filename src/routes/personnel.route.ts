import express, { Router } from 'express';
import * as personnelController from '../controllers/personnel.controller';

const router: Router = express.Router();

router.get('/personnels', personnelController.getAllPersonnels);
router.get('/personnels/:id', personnelController.getPersonnelByID);
router.put('/personnels/:id', personnelController.updatePersonnelByID);

export { router as personnelRoute };
