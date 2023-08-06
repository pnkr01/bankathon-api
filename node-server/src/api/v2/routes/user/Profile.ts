import express from 'express';
import ProfileController from '../../controller/user/Profile';
import VerifyUser from '../../../../middleware/VerifyUser';

export default class ProfileRoute {
	private static instance: ProfileRoute;
	private ProfileControllerInstance: ProfileController;
	private constructor() {
		// singleton
		this.ProfileControllerInstance = ProfileController.getInstance();
	}

	static getInstance() {
		if (ProfileRoute.instance === undefined) {
			ProfileRoute.instance = new ProfileRoute();
		}
		return ProfileRoute.instance;
	}

	getRouter() {
		const router = express.Router();

		router
			.route('/static/resources/:filename')
			.all(VerifyUser.AuthenticateUser, VerifyUser.IsAdmin)
			.get(this.ProfileControllerInstance.getStaticResources);

		router
			.route('/all-users')
			.all(VerifyUser.AuthenticateUser, VerifyUser.IsAdmin)
			.get(this.ProfileControllerInstance.GetUsers);

		router
			.route('/:userID')
			.all(VerifyUser.AuthenticateUser, VerifyUser.IsAdmin)
			.patch(this.ProfileControllerInstance.updateProfile)
			.get(this.ProfileControllerInstance.GetUserProfile);

		router
			.route('/')
			.all(VerifyUser.AuthenticateUser)
			.get(this.ProfileControllerInstance.GetProfile);

		return router;
	}
}
