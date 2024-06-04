import { Router } from 'express';
import absensiRouter from './absensi.router.js';

const router = Router();

const routes = [
  {
    path: '/absensi',
    route: absensiRouter,
  },
];

routes.forEach((r) => router.use(r.path, r.route));

export { router, absensiRouter };
