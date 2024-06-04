import { Router } from 'express';
import { AbsensiValidator } from '../validators/index.js';
import AbsensiController from '../core/absensi/absensi.controller.js';
import ValidatorMiddleware from '../middleware/validator.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const absensiRouter = Router();
const controller = new AbsensiController();

absensiRouter.post(
  '/create',
  authMiddleware,
  ValidatorMiddleware(AbsensiValidator.createAbsensi),
  controller.createAbsensi,
);

export default absensiRouter;