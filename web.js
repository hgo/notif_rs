
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/message/:action/:to', function (req, res) {
  target = connections[req.params.to]    
  console.log(req.params);
  if (target) {
    
    connections[req.params.to].emit(req.params.action, req.body);
    res.send(200);
  }
  else
    res.send(404);
});
 

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
}),
 connections = {},
 io = require('socket.io').listen(server);
 
io.configure(function () { 
  io.enable('browser client minification');  // send minified client
  io.enable('browser client etag');          // apply etag caching logic based on version number
  io.enable('browser client gzip');          // gzip the file
  io.set('log level', 1);                    // reduce logging
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});
 
/********** socket.io work ***************/
io.sockets.on('connection', function(socket) {
  console.log('io connection');
  socket.on('username', function(username) {
    connections[username] = socket;
  });
 
});
