var loopback   = require('loopback');
var jwt        = require('jsonwebtoken');

module.exports = function(options) {
  return function authorize(req, res, next) {
    var authorization = req.header('authorization');
    if (!authorization) return next();

    // verify and decode token to an object
    jwt.verify(authorization, options.jwt.client_secret, {subject: "access_token"}, function (err, token) {
      // our ACL works on req.accessToken, so we add it here
      if (!err) req.accessToken = token;

      next();
    });
  }
}
