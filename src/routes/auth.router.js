import { protect } from '../../middleware/auth.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { authLogin, authLogout, authRefreshToken } from '../resources/auth.resource.js';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', authLogin);
authRouter.get('/refresh', authMiddleware, authRefreshToken);
authRouter.delete('/logout', authMiddleware, authLogout);

export default authRouter;
