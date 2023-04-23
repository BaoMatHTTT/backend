import express, { Router } from 'express';
import * as projectContronler from '../controllers/project.controller';

const router: Router = express.Router();

router.get('/projects', projectContronler.getAllProject);
router.get('/projects/joined', projectContronler.getJoinedProject);
router.get('/projects/:id', projectContronler.getProjectByID);
router.put('/projects/:id', projectContronler.updateProjectByID);
router.get('/projects/:id/personnels', projectContronler.getProjectPersonnelByID);

export { router as projectRoute };
