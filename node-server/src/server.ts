import path from 'path';
import dotenv from 'dotenv';
const envFileName =
	process.env.NODE_ENV !== undefined ? `.env.${process.env.NODE_ENV}` : '.env.development';

dotenv.config({
	path: path.resolve(process.cwd(), envFileName),
});

import connectDB from './config/DB';
import express from 'express';
import configServer from './server-config';

import { IS_PRODUCTION, PORT } from './config/const';
import Date from './utils/DateUtils';
import logger from './config/Logger';
import ErrorReporter from './utils/ErrorReporter';

//  ------------------------- Setup Variables
const app = express();
configServer(app);

function startServer() {
	if (PORT === undefined) {
		logger.info('Server cannot be started without port.', {
			label: 'Running Status',
		});
		return process.exit(1);
	}
	if (IS_PRODUCTION) {
		for (let i = 0; i < 4; i++) {
			const port = Number(PORT) + i;
			startServerAtPort(port.toString());
		}
	} else {
		startServerAtPort(PORT);
	}
	connectDB()
		.then(() => {
			logger.info('Database connected');
		})
		.catch((err) => {
			logger.error(err.message, {
				label: 'Running Status - Database Connection Failed',
			});
			process.exit();
		});
}

function startServerAtPort(port: string) {
	const server = app.listen(port, async () => {
		logger.info(`Server started on port ${port}`, {
			label: 'Running Status',
		});
	});

	process.on('unhandledRejection', (err: Error) => {
		ErrorReporter.report(err);
		logger.error(`Logged Error at ${Date.dateTime()}: ${err.message}`);
		server.close(() => process.exit(1));
	});
}

startServer();
