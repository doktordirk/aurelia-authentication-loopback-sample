var emailConfig = require('../../server/email-config.json');
var config = require('../../server/config.json');
var modelConfig = require('../../server/model-config.json');

var error = function(msg, statusCode, code) {
  var err = new Error(msg);
  err.statusCode = statusCode;
  err.code = code;
  return err;
};

module.exports = function(User) {

  // send verification email after registration
  // User.afterRemote('create',..) is triggered
  // after the User's remoteMethod 'create' was called
  User.afterRemote('create', function(context, user, next) {
   
    // Only send verification email if required by config.
    if (modelConfig.user.options.emailVerificationRequired) {
   
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
          user.destroy(function() {
            next(err);
          });
        }
        else {
          console.log('> sending verification email to:', user.email);
          next();
        }
      });
    }
  });

  // send password reset link when requested
  // The User model User.resetPassword() method emits the 'resetPasswordRequest' event.
  // https://docs.strongloop.com/display/public/LB/User+REST+API#UserRESTAPI-Resetpassword
  User.on('resetPasswordRequest', function(info) {

    // setting up email options
    var options = Object.assign(emailConfig.reset, {
      to: info.email,
    });
    var url = config.client + options.url + '?access_token=' + info.accessToken.id;
    options.text = options.text.replace('{href}',url);

    User.app.models.Email.send(options, function(err) {
      if (err) {
        console.error('> error sending password reset email');
        return;
      }
      console.log('> sending password reset email to:', info.email);
    });
  });

  // remoteMethod User.setPassword
  // http: {verb: 'post', path: '/:id/set-password'}
  User.setPassword = function(id, options, cb) {
    options = options || {};
    if (typeof options.password !== 'string')
      return cb(error('Pwd is required', 400, 'PWD_REQUIRED'));

    //verify passwords match
    if (!options.password ||
        !options.confirmation ||
        options.password !== options.confirmation) {
      return cb(error('Passwords do not match', 400, 'PWD_MISMATCH'));
    }
    User.findById(id, function(err, user) {
      if (err)
        return cb(err);
      if (!user)
        return cb(error('User not found', 400, 'NOT_FOUND'));

      user.updateAttribute('password', options.password, function(err, user) {
        if (err)
          return cb(err);
        console.log('> password reset processed successfully');
        return cb(null,true);
      });
    });
  };
  User.remoteMethod('setPassword', {
    description: 'Set password for a user with short-lived token.',
    accepts: [
      {arg: 'id', type: 'string', required: true},
      {arg: 'options', type: 'object', required: true, http: {source: 'body'}}
    ],
    http: {verb: 'post', path: '/:id/set-password'}
  });


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
