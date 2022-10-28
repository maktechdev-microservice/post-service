import express from "express";
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from "cors";
import axios from "axios";
const app = express();

app.use(bodyParser.json());
app.use(cors())

const port = 4000;
const posts = {};



app.get("/posts", (req, resp) => {
    resp.send(posts);
}); 

app.post("/posts", async (req, resp) => {
    const id = randomBytes(4).toString('hex')
    const { title, body } = req.body
    posts[id] = { id, title, body }
    await axios.post("http://locahost:4005/events", {
        type: "PostCreated",
        data: {
            id, title, body
        }
    }).catch(err => {
        console.log(`error ${err}`)
    })
    resp.status(201).send(posts[id])
}); 


app.listen(port, () => console.log(`Posts server is listening at ${port}`));