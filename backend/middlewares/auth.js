import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { NODE_ENV, SECRET_SIGNING_KEY } from '../utils/constant.js';

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_SIGNING_KEY : 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }

  req.user = payload;
  return next();
};

export default auth;
