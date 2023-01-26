const express = require('express')
const chalk = require('chalk')
const path = require('path')
const port = 3000
const {addNotes, editingNotes,removeNotes, getNotes} = require('./notes.controller')


const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())


app.get('/', async (req,res)=>{
   res.render('index', {
       title: "Express App",
       notes: await getNotes(),
       created: false
   })
})
app.post('/',async (req,res)=>{
   await addNotes(req.body.title)
    res.render('index', {
        title: "Express App",
        notes: await getNotes(),
        created: true
    })
})
app.delete('/:id',async (req,res)=>{
    await removeNotes(req.params.id)
    res.render('index', {
        title: "Express App",
        notes: await getNotes(),
        created: false
    })
})
app.put('/:name/:id', async (req,res)=>{
   await editingNotes(req.params.id ,req.params.name)
    res.render('index', {
        title: "Express App",
        notes: await getNotes(),
        created: false
    })
})

app.listen(port,()=>{
    console.log(chalk.green(`Server has been started on port ${port}...`))
})