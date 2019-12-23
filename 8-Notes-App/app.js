const chalk = require('chalk');
const yargs = require('yargs');

yargs.version('1.1.0');

// Create add command
yargs.command({
    command: 'add',
    description: 'Add a new note',
    handler: () => {
        console.log('Adding a new note');
    }
});

// Create remove command
yargs.command({
    command: 'remove',
    description: 'Remove a note',
    handler: () => {
        console.log('Removing a note');
    }
});

// Create list command
yargs.command({
    command: 'list',
    description: 'List all notes',
    handler: () => {
        console.log('Listing all notes');
    }
});

// Create read command
yargs.command({
    command: 'read',
    description: 'Read a note',
    handler: () => {
        console.log('Reading a note');
    }
});

console.log(yargs.argv);
