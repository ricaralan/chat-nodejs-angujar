module.exports = function(server) {
	var io = require('socket.io')(server);

	io.on('connection', function(socket) {
		socket.on('sended_message', function(message) {
			io.emit('recive_message', message);
		});
	});

};
