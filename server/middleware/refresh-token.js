module.exports = function(options) {
  var jwt = require('jsonwebtoken');

  return function refreshToken(req, res, next) {
    if (req.body.grant_type !== 'refresh_token') return next();

    // verify and decode refresh_token to an object
    jwt.verify(req.body.refresh_token, options.jwt.client_secret, {subject: 'refresh_token'}, function(err, refresh_token){
      if (err) return next(err)

      var authorization = req.header('authorization');

      var token = authorization
                ? jwt.verify(authorization, options.jwt.client_secret, {ignoreExpiration: true, subject: 'access_token'})
                : null;

      req.app.models[options.jwt.user_model].findOne({ where: {email: refresh_token.email} }, function(err, user) {
        if (err) return next(err);

        var newTokens = user.createAccessToken();

        return res.send(newTokens);
      });
    });
  };
}
