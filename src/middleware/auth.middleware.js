import prisma from '../../prisma/config.js';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		const refreshToken = req.cookies.refreshToken;

		if (!token || !refreshToken) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		const user = await prisma.user.findUnique({ where: { username: decoded.username } });

		if (!user || user.refreshToken !== refreshToken) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		req.username = user.username;
		next();
	} catch (error) {
		console.error('Auth error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
