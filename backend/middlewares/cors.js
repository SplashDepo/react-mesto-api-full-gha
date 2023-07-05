const allowedCors = [
  'https://mesto.splash.nomoreparties.sbs',
  'http://mesto.splash.nomoreparties.sbs',
  'http://api.mesto.splash.nomoreparties.sbs',
  'https://api.mesto.splash.nomoreparties.sbs',
  'http://localhost:3000',
  'http://localhost:3001',
];
const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

export default cors;