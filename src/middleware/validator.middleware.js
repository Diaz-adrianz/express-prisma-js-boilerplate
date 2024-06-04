import httpStatus from 'http-status';
import fs from 'fs';

const validatorMiddleware = (schema) => {
  return (req, res, next) => {
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      // hapus file-file yg diupload multer jika joi validator error
      const uploaded = [];

      if (req.file) uploaded.push(req.file);
      if (req.files) req.files.forEach((file) => uploaded.push(file));

      uploaded.forEach((up) => {
        fs.unlink(up.path, (err) => {
          if (err) {
            console.error(`Error deleting file: ${err}`);
          }
        });
      });

      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        status: false,
        message: 'Validation error',
        data: error.details.map((det) => det.message),
      });
    } else {
      req.body = value;
      next();
    }
  };
};

export default validatorMiddleware;
