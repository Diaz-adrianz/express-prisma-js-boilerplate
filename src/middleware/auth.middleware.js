import jwt from 'jsonwebtoken';
import prismaDB from '../config/prisma.config.js';

export const authMiddleware = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		const refreshToken = req.cookies.refreshToken;

		if (!token || !refreshToken) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		const user = await prismaDB.user.findUnique({ where: { username: decoded.username } });

		// if (!user || user.refreshToken !== refreshToken) {
		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		req.user_id = user.id;
		req.username = user.username;
		next();
	} catch (error) {
		console.error('Auth error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
