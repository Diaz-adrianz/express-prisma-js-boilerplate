import httpStatus from 'http-status';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ status: false, code: 401, message: 'Please authenticate' });
    }

    const checkAuth = await fetch(process.env.SERVER_1_URL + '/api/user/me', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const checkAuthJSON = await checkAuth.json();

    if (checkAuth.status !== 200) {
      return res.status(checkAuth.status).json(checkAuthJSON);
    }

    req.user = checkAuthJSON.data;

    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
