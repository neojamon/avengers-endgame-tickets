const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send('give me my avengers tickets!');
});

