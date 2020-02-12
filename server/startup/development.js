function enableCORSMiddleware(req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
  next();
}


module.exports = {
  enableCORSMiddleware,
};
