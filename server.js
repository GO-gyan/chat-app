var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var config = require('./webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var port = process.env.PORT || 3000;
var socket = require('./server/socket.js')

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
// Routing
app.use(express.static('./client/assets'));

// Route
app.get('/', (req, res) => {
  res.sendFile(path.resolve('client/index.html'));
})

io.sockets.on('connection', socket);

server.listen(port, function(){
  console.log('listening on *:3000');
});