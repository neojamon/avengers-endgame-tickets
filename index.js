const express = require('express');
const app = express();
const hbs = require( 'express-handlebars');
const jobs = require('./jobs');

const PORT = process.env.PORT || 8080;

// view engine setup
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.get('/', async function(req, res) {
  const result = await jobs.cinesa();
  res.render('home', { layout: 'default', result: JSON.stringify(result,null, 2) });
});

app.listen(PORT, function () {
  console.log(`APP listening on port ${PORT}!`);
});

