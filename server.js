var app = require('./server-config.js');

var port = process.env.HOME === '/Users/student' ? 5000 : 80;

app.listen(port);

console.log('Server now listening on port ' + port);
