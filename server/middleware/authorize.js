module.exports = function(options) {
  var loopback   = require('loopback');
  var jwt        = require('jsonwebtoken');

  return function authorize(req, res, next) {
    var authorization = req.header('authorization');
    if (!authorization) return next();

    // verify and decode token to an object
    jwt.verify(authorization, options.jwt.client_secret, {subject: "access_token"}, function (err, token) {

      if (err) return next();

      // our ACL works on req.accessToken, so we add it here
      req.accessToken = token;

      // get user and set context
      req.app.models[options.jwt.user_model].findById(token.userId, function(err, user) {
        if (err) return next(err);

        if (!user) {
          return next(new Error('No user with this userId was found.'));
        }
        var loopbackContext = loopback.getCurrentContext();
        if (loopbackContext) {
          // set user and token as context for this requests ACL
          loopbackContext.set('currentUser', user);
          loopbackContext.set('accessToken', token);
        }
        next();
      });
    });
  }
}
