import express, { Router } from 'express';
import * as projectContronler from '../controllers/project.controller';

const router: Router = express.Router();

router.get('/projects', projectContronler.getAllProject);
router.post('/projects', projectContronler.createProject);
router.get('/projects/:id', projectContronler.getProjectByID);
router.put('/projects/:id', projectContronler.updateProjectByID);
router.delete('/projects/:id', projectContronler.deleteProjectByID);
router.get('/projects/:id/personnels', projectContronler.getProjectPersonnelByID);
router.post('/projects/:id/personnels', projectContronler.addProjectPersonnelByID);

export { router as projectRoute };
