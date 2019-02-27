const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', function(req, res) {
  res.send('give me my avengers tickets!');
});

app.listen(PORT, function () {
  console.log(`APP listening on port ${PORT}!`);
});

