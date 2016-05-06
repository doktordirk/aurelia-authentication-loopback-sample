var jwt = require('jsonwebtoken');
var config = require('../../server/config.json');

module.exports = function createAccessToken(payload, cb) {
  function signToken(tokenPayload, subject, expiresIn) {
    return jwt.sign(tokenPayload, config.jwt.client_secret, {
            expiresIn: expiresIn,
            subject: subject
          });
  };

  // response body
  var result = {
    user_id: this.id,
    access_token: signToken(payload, 'access_token', config.jwt.access_token_ttl)
  };
  if (config.jwt.refresh_token_ttl)
    result.refresh_token = signToken(payload, 'refresh_token', config.jwt.refresh_token_ttl);

  if (typeof cb !== 'function') {
    return result;
  }
  return cb(null, result);
};
