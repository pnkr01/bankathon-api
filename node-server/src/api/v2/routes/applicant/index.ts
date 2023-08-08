import express from 'express';
import VerifyUser from '../../../../middleware/VerifyUser';
import ApplicantController from '../../controller/applicant';

export default class ApplicantRoute {
	private static instance: ApplicantRoute;
	private ApplicantControllerInstance: ApplicantController;
	private constructor() {
		// singleton
		this.ApplicantControllerInstance = ApplicantController.getInstance();
	}

	static getInstance() {
		if (ApplicantRoute.instance === undefined) {
			ApplicantRoute.instance = new ApplicantRoute();
		}
		return ApplicantRoute.instance;
	}

	getRouter() {
		const router = express.Router();

		router
			.route('/')
			.all(VerifyUser.AuthenticateUser)
			.get(this.ApplicantControllerInstance.getApplicants)
			.all(VerifyUser.IsUser)
			.post(this.ApplicantControllerInstance.registerApplication);

		return router;
	}
}
