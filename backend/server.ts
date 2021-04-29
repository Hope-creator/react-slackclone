import express from 'express';

const app = express();
const port = 5000;

app.get('/hello', (req: express.Request, res: express.Response) => {
    res.send("hello")
})

app.listen(port, ()=> {
    console.log(`Server is up on ${port}`)
})