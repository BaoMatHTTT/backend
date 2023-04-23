import express, { Router } from 'express';
import * as personnelController from '../controllers/personnel.controller';

const router: Router = express.Router();

router.get('/personnels', personnelController.getAllPersonnel);
router.get('/personnel/:id', personnelController.getPersonnelByID);
router.put('/personnel/:id', personnelController.updatePersonnelByID);

export { router as personnelRoute };
