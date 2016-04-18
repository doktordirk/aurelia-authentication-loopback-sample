var config = require('../../server/config.json');
var modelConfig = require('../../server/model-config.json');

var error = function(msg, statusCode, code) {
  var err = new Error(msg);
  err.statusCode = statusCode;
  err.code = code;
  return err;
};

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
};
