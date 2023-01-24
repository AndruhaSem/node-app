const yargs = require('yargs')
const {addNotes, printNotes,removeNotes} = require('./notes.controller')

yargs.command({
    command: "add",
    describe: "Add new note to list",
    builder: {
        title:{
            type: "string",
            describe: "Note title",
            demandOption: true
        }
    },
    handler({title}) {
       addNotes(title)
    }
})
yargs.command({
    command: "remove",
    describe: "Remove note by id",
    builder: {
        title:{
            type: "string",
            describe: "Note title",
            demandOption: true
        }
    },
    handler({title}) {
        removeNotes(title)
    }
})
yargs.command({
    command: "list",
    describe: "Print all notes",
   async handler() {
       printNotes()
    }
})
yargs.parse()