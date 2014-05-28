var http = require('http');

http.createServer(function (req, res) {
	res.end(JSON.stringify({
		time: (new Date()).toJSON()
	}));
}).listen(3333);