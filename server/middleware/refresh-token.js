var createAccessToken = require('../../server/middleware/createAccessToken');
var jwt = require('jsonwebtoken');

module.exports = function(options) {
  return function refreshToken(req, res, next) {
    if (req.body.grant_type !== 'refresh_token') return next();

    // verify and decode refresh_token to an object
    jwt.verify(req.body.refresh_token, options.jwt.client_secret, {
      subject: 'refresh_token'
    }, function(err, refresh_token){
      if (err) return next(err)

      var authorization = req.header('authorization');
      if (!authorization) return next();

      // decode access_token to get the user data
      jwt.verify(authorization, options.jwt.client_secret, {
        ignoreExpiration: true,
        subject: 'access_token'
      }, function(err, token) {
        if (err) return next(err);

        // remove claims
        token.exp = undefined;
        token.iat = undefined;
        token.nbf = undefined;
        token.aud = undefined;
        token.sub = undefined;

        // send back new tokes
        res.json(createAccessToken(token));
      });
    });
  };
}
