const express = require('express');
const app = express();

// Set up a route to respond to GET requests at the root path
app.get('/', function (req, res) {
  res.send('Hello, world!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server listening on port ' + port);
});

