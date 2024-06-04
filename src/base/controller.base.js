import httpStatus from 'http-status';

class BaseController {
  constructor() {}

  responseBadRequest = (res, data = null, message = '') => {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: false,
      message: message || 'Invalid request',
      data,
    });
  };

  responseSuccess = (res, data = null, message = '') => {
    return res.status(httpStatus.OK).json({
      status: true,
      message: message || 'Success',
      data,
    });
  };

  responseNotFound = (res, message = '') => {
    return res.status(httpStatus.NOT_FOUND).json({
      status: false,
      message: message || 'Not found',
    });
  };

  responseServerError = (res, message = '') => {
    return res.status(httpStatus.OK).json({
      status: true,
      message: message || 'Something went wrong',
    });
  };

  wrapWithCatch(method) {
    return async (req, res, ...args) => {
      try {
        return await method.apply(this, [req, res, ...args]);
      } catch (error) {
        console.log('ERR: ', error.message);
        if (error.message.includes('NOT_FOUND')) {
          this.responseNotFound(res);
        } else {
          this.responseServerError(res);
        }
      }
    };
  }
}

export default BaseController;
