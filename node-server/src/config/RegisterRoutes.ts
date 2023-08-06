import { Express, NextFunction, Request, Response } from 'express';
import apiV2 from '../api/v2/routes';
import { UPLOADS_PATH } from './const';
import { z } from 'zod';
import APIError, { API_ERRORS } from '../errors/api-errors';
import { FileUtils } from '../utils/files';
import ErrorReporter from '../utils/ErrorReporter';

export class RegisterRoutes {
	static register(app: Express) {
		this.registerV2Route(app);

		app.get('/api-status', async (req, res) => {
			res.status(200).json({
				success: true,
				message: 'API Working',
			});
		});
		// app.get('/fetch-eod', Ticker.FetchEODToServer);

		app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
			if (err instanceof APIError) {
				if (err.status === 500) {
					ErrorReporter.reportServerError(err.error);
				}
				return res.status(err.status).json({
					success: false,
					status: 'error',
					title: err.title,
					message: err.message,
				});
			}

			ErrorReporter.report(err);
			res.status(500).json({
				success: false,
				status: 'error',
				title: 'Internal Server Error',
				message: err.message,
			});
			next();
		});
	}

	/**
	 * @param app Express app
	 *  Registers all the routes available in version 1 of the API
	 */
	static registerV2Route(app: Express) {
		app.use('/v2', apiV2);
	}

	/**
	 * @param app Express app
	 *  Register the route to serve images
	 */
	static registerImageRoute(app: Express) {
		app.get('/static/uploads/:filename', async (req, res, next) => {
			const { filename } = req.params;
			const validId = z
				.string()
				.transform((val) => val.trim())
				.safeParse(filename).success;

			if (!validId) {
				return next(new APIError(API_ERRORS.COMMON_ERRORS.NOT_FOUND));
			}
			try {
				if (FileUtils.exists(__basedir + UPLOADS_PATH + filename)) {
					res.sendFile(__basedir + UPLOADS_PATH + filename);
				} else {
					throw new Error('File not found');
				}
			} catch (e) {
				return next(new APIError(API_ERRORS.COMMON_ERRORS.NOT_FOUND));
			}
		});
	}
}
