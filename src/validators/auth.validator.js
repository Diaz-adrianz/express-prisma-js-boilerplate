import { body } from 'express-validator';

export const AuthValidator = {
	createUser: [
		body('username').notEmpty().isString(),
		body('password').isLength(8).notEmpty().isString(),
		body('password_verif').isLength(8).notEmpty().isString(),
	],
};
