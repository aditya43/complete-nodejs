const fs = require('fs');

const getNotes = () => {
    return 'Your notes...';
};

// Add a new notes
const addNote = (title, body) => {
    const notes = loadNotes();

    // Check for duplicate notes
    const duplicateNotes = notes.filter(note => note.title === title);

    if (duplicateNotes.length > 0) {
        console.log('Note already exists!');
    }

    // Add new note
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
        console.log('New note added!');
    }
};

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

module.exports = {
    getNotes,
    addNote
};
