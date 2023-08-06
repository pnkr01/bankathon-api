import express, { Express, Request, Response, NextFunction } from 'express';
import { RegisterRoutes } from './config/RegisterRoutes';
import CorsConfig from './config/CorsConfig';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import logger from './config/Logger';
import { IS_PRODUCTION, IS_UAT } from './config/const';

export default function (app: Express) {
	//Defines all global variables and constants

	global.logger = logger;
	let basedir = __dirname.slice(0, __dirname.lastIndexOf('/'));
	if (IS_PRODUCTION || IS_UAT) {
		basedir = basedir.slice(0, basedir.lastIndexOf('/'));
	}
	global.__basedir = basedir;

	//Initialize all the middleware
	app.use(express.urlencoded({ extended: true, limit: '50mb' }));
	app.use(express.json({ limit: '50mb' }));
	app.use(cors(CorsConfig));
	app.use(cookieParser());
	app.use(express.static(__basedir + 'static'));
	app.use((req: Request, res: Response, next: NextFunction) => {
		req.locals = {
			...req.locals,
		};
		next();
	});

	//  ------------------------- Routes
	RegisterRoutes.register(app);
}
