import { authMiddleware } from '../middleware/auth.middleware.js';
import { authLogin, authLogout, authRefreshToken, authRegister } from '../resources/auth.resource.js';
import { Router } from 'express';
import { AuthValidator } from '../validators/auth.validator.js';

const authRouter = Router();

authRouter.post('/login', authLogin);
authRouter.post('/register', AuthValidator.createUser, authRegister);
authRouter.get('/refresh', authMiddleware, authRefreshToken);
authRouter.delete('/logout', authMiddleware, authLogout);

export default authRouter;
