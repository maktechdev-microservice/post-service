import express from "express";
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from "cors";
const app = express();

app.use(bodyParser.json());
app.use(cors())

const port = 4000;
const posts = {};



app.get("/posts", (req, resp) => {
    resp.send(posts);
}); 

app.post("/posts", (req, resp) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {id, title};

    resp.status(201).send(posts[id]);

}); 


app.listen(port, () => console.log(`Posts server is listening at ${port}`));