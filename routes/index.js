// Require express module
const router = require('express').Router();

// Import modular router for notes route
const notesRouter = require('./notes.js');

// Route /api/notes to notes.js routes
router.use('/notes', notesRouter);

// Export the routes
module.exports = router;
