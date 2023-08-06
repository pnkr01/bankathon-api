import express from 'express';
import VerifyUser from '../../../../middleware/VerifyUser';
import JobController from '../../controller/job';

export default class JobRoute {
	private static instance: JobRoute;
	private jobControllerInstance: JobController;
	private constructor() {
		// singleton
		this.jobControllerInstance = JobController.getInstance();
	}

	static getInstance() {
		if (JobRoute.instance === undefined) {
			JobRoute.instance = new JobRoute();
		}
		return JobRoute.instance;
	}

	getRouter() {
		const router = express.Router();

		router.route('/:id').all(VerifyUser.AuthenticateUser).get(this.jobControllerInstance.getJob);

		router
			.route('/')
			.all(VerifyUser.AuthenticateUser)
			.get(this.jobControllerInstance.getJobs)
			.all(VerifyUser.IsAdmin)
			.patch(this.jobControllerInstance.updateJob)
			.post(this.jobControllerInstance.createJob);

		return router;
	}
}
