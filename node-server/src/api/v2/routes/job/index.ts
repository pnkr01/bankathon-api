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

		router
			.route('/screenings/:id/questions')
			.all(VerifyUser.AuthenticateUser, VerifyUser.IsUser)
			.get(this.jobControllerInstance.screeningQuestion);

		router
			.route('/screenings/:id/answers')
			.all(VerifyUser.AuthenticateUser, VerifyUser.IsUser)
			.post(this.jobControllerInstance.completeScreening);
		router
			.route('/screenings')
			.all(VerifyUser.AuthenticateUser, VerifyUser.IsUser)
			.get(this.jobControllerInstance.screenings);

		router
			.route('/:id/active')
			.all(VerifyUser.AuthenticateUser, VerifyUser.IsAdmin)
			.post(this.jobControllerInstance.activate);

		router
			.route('/:id/inactive')
			.all(VerifyUser.AuthenticateUser, VerifyUser.IsAdmin)
			.post(this.jobControllerInstance.deactivate);

		router
			.route('/:id/accept-enhanced-job-description')
			.all(VerifyUser.AuthenticateUser, VerifyUser.IsAdmin)
			.post(this.jobControllerInstance.acceptEnhancedDescription);

		router
			.route('/:id')
			.all(VerifyUser.AuthenticateUser)
			.get(this.jobControllerInstance.getJob)
			.all(VerifyUser.IsAdmin)
			.patch(this.jobControllerInstance.updateJob);

		router
			.route('/')
			.all(VerifyUser.AuthenticateUser)
			.get(this.jobControllerInstance.getJobs)
			.all(VerifyUser.IsAdmin)
			.post(this.jobControllerInstance.createJob);

		return router;
	}
}
