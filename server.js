// Require modules
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

// Declare express module to variable
const app = express();

// Middleware to parse json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add the /api endpoint through middleware to hide url
app.use('/api', api);

// GET Route for index.html on load
app.use(express.static('public'));

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for wildcard page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
