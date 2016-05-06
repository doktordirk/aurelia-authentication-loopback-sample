var createAccessToken = require('../../server/middleware/createAccessToken');
var config = require('../../server/config.json');

module.exports = function(User) {
  // remoteMethod User.unlink
  // third party unlink locally. stays linked on facebook currently
  // http: {path:'/:id/unlink/:provider', verb: 'get'}
  User.unlink = function(id, provider, cb) {
    User.findById(id, function(err, user) {
      if (err)
        return cb(err);
      if (!user) {
        return cb({ message: 'User not found' });
      }
      var providerId = user[provider];
      user[provider] = null;
      user.save(function (err, _user) {
        if (err) {
          user[provider] = providerId;
          return cb(err);
        }
        return cb(null, true);
      });
    });
  };

  User.remoteMethod('unlink', {
    description: 'Unlink third-party login provider.',
    accepts: [
      {arg: 'id', type: 'string', required: true},
      {arg: 'provider', type: 'string', required: true},
    ],
    returns: {arg: 'success', type: 'boolean'},
    http: {path:'/:id/unlink/:provider', verb: 'get'}
  });


  // provide own createAccessToken to create JWTs
  User.prototype.createAccessToken = function (ttl, options, cb) {
    if (cb === undefined && typeof options === 'function') {
      cb = options;
      options = undefined;
    }

    // token payload
    var payload = {};
    for (var key in config.jwt.properties) {
      payload[key] = this[config.jwt.properties[key]];
    }

    var response = createAccessToken(payload);

    if (typeof cb !== 'function') return response;

    return cb(null, response);
  };
};
