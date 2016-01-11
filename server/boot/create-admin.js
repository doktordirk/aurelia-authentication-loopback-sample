/* 99.9% copied from https://github.com/BoLaMN/loopback-component-admin */

var options = require('../config').options;

var createAdminRole, createDefaultAdmin;

module.exports = function(app) {
  var ACL, Role, RoleMapping, User;
  ACL = app.models.ACL;
  Role = app.models.Role;
  RoleMapping = app.models.RoleMapping;
  User = app.models[options.userModel];
  if (!User) {
    User = app.models.User;
  }

  User.count(function(error, count) {
    if (error) {
      console.log('Error setting up default admin.');
      console.dir(error);
      return;
    }

    if (count === 0) {
      Role.findOne({
        where: {
          name: options.roleAdmin.name
        }
      }, function(error, result) {
        if (error) {
          console.log('Error setting up default admin role.');
          console.dir(error);
          return;
        }
        if (!result) {
          createAdminRole(Role, function(error, role) {
            if (error) {
              console.log('Error creating admin role.');
              console.dir(error);
              return;
            }
            createDefaultAdmin(User, RoleMapping, ACL, role.id);
          });
        } else {
          createDefaultAdmin(User, RoleMapping, ACL, result.id);
        }
      });
    }
  });
};

createAdminRole = function(Role, callback) {
  var role = options.roleAdmin;
  Role.create(role, callback);
};

createDefaultAdmin = function(User, RoleMapping, ACL, roleId) {
  var userAdmin = options.userAdmin;
  userAdmin.created = new Date;
  User.create(userAdmin, function(error, user) {
    if (error) {
      console.log('Error creating \'admin\' user.');
      console.dir(error);
      return;
    }
    RoleMapping.create({
      principalType: 'USER',
      principalId: user.getId(),
      roleId: roleId
    }, function(error, result) {
      if (error) {
        console.log('Error creating \'admin\' role mapping.');
        console.dir(error);
        return;
      }
      console.log('Created default \'admin\' user with password \'password\'.');
    });
// Here one can set ACL for the build-in models
/*    ACL.create({
      model: User.definition.name,
      property: '*',
      accessType: '*',
      permission: 'ALLOW',
      principalType: 'ROLE',
      principalId: options.roleAdmin.name
    });
    ACL.create({
      model: 'AccessToken',
      property: '*',
      accessType: '*',
      permission: 'ALLOW',
      principalType: 'ROLE',
      principalId: options.roleAdmin.name
    });*/
  });
};
