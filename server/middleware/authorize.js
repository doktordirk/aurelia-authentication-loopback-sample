var jwt = require('jsonwebtoken');

module.exports = function(options) {
  return function authorize(req, res, next) {
    var access_token = req.header('authorization');
    if (!access_token) return next();

    // verify and decode token to an object
    jwt.verify(access_token, options.jwt.client_secret, function (err, token) {
      // our ACL works on req.accessToken, so we add it here
      if (!err) req.accessToken = token;

      next();
    });
  }
}
