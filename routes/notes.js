// Require modules
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils.js');

// This GET resquest for /api/notes will respond with the db.json data
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// This POST resquest for /api/notes will respond with an updated db.json containing the new note obj
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;
    // adds a new property to the request body object before responding
    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };
        // respond with the updated db.json data
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding note');
    }
});

// This DELETE resquest for api/notes/note_id will respond with a success msg after deleting the note obj matching the note_id and updating the db.json file
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // this filter method will make a new array of the db.json data, excluding the note obj matching the note_id parameter
            const result = json.filter((note) => note.note_id !== noteId);

            // overwrite the db.json file with new array
            writeToFile('./db/db.json', result);

            // respond with success msg
            res.json(`Note '${noteId}' has been deleted!`);
        });
});

// Export the routes
module.exports = notes;