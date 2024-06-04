import Joi from 'joi';

export const AbsensiValidator = {
  createAbsensi: Joi.object({
    user_id: Joi.number().required(),
    type: Joi.string().valid('hadir', 'izin', 'cuti').required(),
    date: Joi.date().required(),
  }),
};
