import http from "http";
import fs from "fs/promises";
import path from "path";
import {addNotes} from "./notes.controller";

const server = http.createServer(async (req,res)=>{
    if(req.method === 'GET'){
        const content = await fs.readFile(path.join(basePath, 'indexx.ejs'))
        res.writeHead(200,{
            'Content-Type': "text/html"
        })
        res.end(content)
    } else if(req.method === 'POST'){
        const body = []
        req.on('data',data=>{
            body.push(Buffer.from(data))
        })
        req.on('end', ()=>{
            const title = body.toString().split('=')[1].replaceAll('+', ' ')
            addNotes(title)
        })
        res.end('Post')
    }
})