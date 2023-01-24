const fs = require('fs/promises')
const path = require('path')
// const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNotes(title){
    // const notes = require('./db.json')
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
   await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function removeNotes(id){
    const notes = await getNotes()
    const note = notes.filter((e)=>e.id !== id)
    await fs.writeFile(notesPath, JSON.stringify(note))
}

async function getNotes(){
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}
async function printNotes(){
    const notes = await  getNotes()
    notes.forEach((e)=>console.log(e.id, e.title))

}
module.exports = {
    addNotes, printNotes,removeNotes
}