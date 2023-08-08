import express from 'express';
import { AuthRoute, ProfileRoute } from './user';
import JobRoute from './job';
import ApplicantRoute from './applicant';

const router = express.Router();

/**
 * Creates a router for all the routes in version 1 of the API
 *
 * @returns the router
 */

router.use('/u/auth', AuthRoute.getInstance().getRouter());
router.use('/u/profile', ProfileRoute.getInstance().getRouter());

router.use('/job', JobRoute.getInstance().getRouter());
router.use('/applicants', ApplicantRoute.getInstance().getRouter());

export default router;
