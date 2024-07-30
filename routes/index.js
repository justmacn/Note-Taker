const router = require('express').Router();

// Import modular router for notes route
const notesRouter = require('./notes.js');

router.use('/notes', notesRouter);

module.exports = router;
