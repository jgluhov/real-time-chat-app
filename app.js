/**
 * Created by jgluhov on 18/01/16.
 */
var express = require('express'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  jade = require('jade'),
  path = require('path');

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');
app.engine('jade', jade.__express);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index')
});

io.listen(app.listen(3000));

io.on('connection', function (socket) {
  socket.emit('message', {message: 'Welcome to our chat!'});
  socket.on('send', function(data) {
    io.emit('message', data);
  })
});