const fs = require('fs');
const chalk = require('chalk');

// Read a note
const readNote = title => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);

    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    }

    if (!note) {
        console.log(chalk.red.inverse('Note not found!'));
    }
};

// Add a new notes
const addNote = (title, body) => {
    const notes = loadNotes();

    // Check for duplicate notes
    const duplicateNote = notes.find(note => note.title === title);

    if (duplicateNote) {
        console.log(chalk.red.inverse('New note added!'));
    }

    // Add new note
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    }
};

// Remove Note
const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);

    // Note found
    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse('Note removed!'));
    }

    if (notes.length === notesToKeep.length) {
        console.log(chalk.red.inverse('Note not found!'));
    }
};

// Save notes
const saveNotes = notes => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
};

// Load Notes
const loadNotes = () => {
    try {
        const dataBufffer = fs.readFileSync('notes.json');
        const dataJson = dataBufffer.toString();

        return JSON.parse(dataJson);
    } catch (e) {
        console.dir(e);
        return [];
    }
};

// List Notes
const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse('Your Notes:'));

    notes.forEach(note => console.log(note.title));
};

module.exports = {
    readNote,
    addNote,
    removeNote,
    listNotes
};
