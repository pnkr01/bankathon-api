import express from 'express';
import { AuthController } from '../../controller/user';

export default class AuthRoute {
	private static instance: AuthRoute;
	private AuthControllerInstance: AuthController;
	private constructor() {
		// singleton
		this.AuthControllerInstance = AuthController.getInstance();
	}

	static getInstance() {
		if (AuthRoute.instance === undefined) {
			AuthRoute.instance = new AuthRoute();
		}
		return AuthRoute.instance;
	}

	getRouter() {
		const router = express.Router();

		router.route('/login').post(this.AuthControllerInstance.Login);
		router.route('/verify-login').post(this.AuthControllerInstance.VerifyLogin);
		router.route('/logout').post(this.AuthControllerInstance.Logout);
		router.route('/refresh-token').post(this.AuthControllerInstance.RefreshLogin);

		return router;
	}
}
