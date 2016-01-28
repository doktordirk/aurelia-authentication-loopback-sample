try {

var loopback   = require('loopback');
var boot       = require('loopback-boot');
var morgan     = require('morgan');

var app = module.exports = loopback();

// use morgan to log requests to the console
//app.use(morgan('dev'));


app.start = function() {
  // start the web server
  return app.listen(function() {
    var baseUrl = app.get('host') + ':' + app.get('port');
    app.emit('started');
    console.log('LoopBack server listening @ %s%s', baseUrl, '/');
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

//setting up a /users/me path for logged in uses
app.use(loopback.token({
    model: app.models.accessToken,
    currentUserLiteral: 'me'
}));

} catch(e){
  console.log('server.js error: ', e);
}
