module.exports = function(User) {
  // --- third party unlink ---
  // unlink locally. stays linked on facebook currently
  User.unlink = function(id, provider, callback) {
    User.findById(id, function(err, user) {
      if (!user) {
        callback({ message: 'User not found' }, false);
      }
      var providerId = user[provider];
      user[provider] = null;
      user.save(function (err, _user) {
        if (err) {
          user[provider] = providerId;
          callback(err, false);
        }
        callback(null, true);
      });
    });
  };
  User.remoteMethod('unlink', {
    accepts: [
      {arg: 'id', type: 'string', required: true},
      {arg: 'provider', type: 'string', required: true},
    ],
    returns: {arg: 'success', type: 'boolean'},
    http: {path:'/:id/unlink/:provider', verb: 'get'}
  });
};
