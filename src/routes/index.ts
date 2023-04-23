import express, { Router } from 'express';
import { authRoute } from './auth.route';
import { personnelRoute } from './personnel.route';
import { projectRoute } from './project.route';

const router: Router = express.Router();

const routes: Array<Router> = [
    authRoute,
    personnelRoute,
    projectRoute
];

router.use(routes);

export { router as routes };