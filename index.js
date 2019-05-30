var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

const users = [];
io.on('connection', function(socket) {
	console.log('client connected');
	users.push({
		id: socket.id,
		name: ''
	});
	socket.on('disconnect', function() {
		console.log('client disconnected')
	});
	socket.on('chat message', function(msg) {
		io.emit('chat message', `${msg}`);

		// const user = users.find((user, i) => {index=i;return user.id===socket.id});
		// if ( user.name ) {
		// 	console.log('sending message to client');
		// 	io.emit('chat message', `${user.name}: ${msg}`);
		// } else {
		// 	user.name = msg;
		// }
	})
})

http.listen(3001, function() {
	console.log('listening on *:3001');
});
