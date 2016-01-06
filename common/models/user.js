var emailConfig = require('../../server/email-config.json');
var config = require('../../server/config.json');

module.exports = function(User) {

  // send verification email after registration
  // User.afterRemote('create',..) is triggered
  // after the User's remoteMethod 'create' was called
  User.afterRemote('create', function(context, user, next) {
    // setting up email options
    var options = Object.assign(emailConfig.confirm, {
      to: user.email,
      user: user
    });
    options.redirect = encodeURIComponent(config.client + options.redirect);

    // send email
    user.verify(options, function(err, response) {
      if (err) {
        console.error('> email sent error:', err);
        next(err);
      }
      else {
        next();
      }
    });
  });

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
