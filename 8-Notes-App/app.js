const yargs = require('yargs');
const notes = require('./notes');

yargs.version('1.1.0');

// Create add command
yargs.command({
    command: 'add',
    description: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body);
    }
});

// Create remove command
yargs.command({
    command: 'remove',
    description: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title);
    }
});

// Create list command
yargs.command({
    command: 'list',
    description: 'List all notes',
    handler: () => {
        notes.listNotes();
    }
});

// Create read command
yargs.command({
    command: 'read',
    description: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.readNote(argv.title);
    }
});

yargs.parse();
