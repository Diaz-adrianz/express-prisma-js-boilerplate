import httpStatus from 'http-status';

const ValidatorMiddleware = (schema) => {
  return (req, res, next) => {
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
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

export default ValidatorMiddleware;
