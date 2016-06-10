var jwt = require('jsonwebtoken');

module.exports = function(options) {
  return function refreshToken(req, res, next) {
    if (req.body.grant_type !== 'refresh_token') return next();

    var secret = options.client_secret;
    var at_ttl = options.access_token_ttl;
    var rt_ttl = options.refresh_token_ttl;

    // verify and decode refresh_token to an object
    jwt.verify(req.body.refresh_token, secret, function(err) {
      if (err) return next(err)

      var access_token = req.header('authorization');
      if (!access_token) return next();

      // decode access_token to get the user data
      jwt.verify(access_token, secret, {ignoreExpiration: true}, function(err, token) {
        if (err) return next(err);

        // remove claims
        token.exp = undefined;
        token.iat = undefined;
        token.nbf = undefined;
        token.aud = undefined;
        token.sub = undefined;

        var response = {
          'access_token': jwt.sign(token, secret, {expiresIn: at_ttl}),
          'refresh_token': jwt.sign(token, secret, {expiresIn: rt_ttl})
        };

        if (options.authentication_response_body) {
          Object.assign(response, options.authentication_response_body);
        }

        // send back new tokens
        res.json(response);
      });
    });
  };
}
