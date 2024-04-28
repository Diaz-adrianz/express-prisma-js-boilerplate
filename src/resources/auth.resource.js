import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prismaDB from '../config/prisma.config.js';
import { validationResult } from 'express-validator';

export const authLogin = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await prismaDB.user.findUnique({ where: { username: username } });
		if (!user) {
			return res.status(401).json({ message: 'Invalid username or password' });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid username or password' });
		}

		const token = jwt.sign({ username: user.username, user_id: user.id }, process.env.TOKEN_SECRET, {
			expiresIn: process.env.TOKEN_HOUR + 'h',
		});

		res.cookie('refreshToken', user.refreshToken, { httpOnly: true });

		res.status(200).json({
			user,
			token,
		});
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const authRefreshToken = async (req, res) => {
	try {
		const username = req.username;
		const user_id = req.user_id;
		const token = jwt.sign({ username, user_id }, process.env.TOKEN_SECRET, {
			expiresIn: process.env.TOKEN_HOUR + 'h',
		});

		res.json({ token });
	} catch (error) {
		console.error('Refresh token error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const authRegister = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const { username, password, password_verif } = req.body;

		if (password !== password_verif) {
			return res.status(422).json({
				message: "Second password doesn't match",
			});
		}

		const userExist = await prismaDB.user.findUnique({ where: { username } });
		if (userExist) {
			return res.status(422).json({
				message: 'Username already exist',
			});
		}

		const salt = await bcrypt.genSalt();
		const password_hashed = await bcrypt.hash(password, salt);

		const user = await prismaDB.user.create({
			data: {
				username,
				password: password_hashed,
				createdBy: username,
			},
		});
		return res.json(user);
	} catch (error) {
		console.error('Create user error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const authLogout = async (req, res) => {
	try {
		res.clearCookie('refreshToken');

		res.json({ message: 'Logged out successfully' });
	} catch (error) {
		console.error('Logout error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
