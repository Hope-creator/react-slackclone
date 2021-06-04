import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import createSocket from "./core/socket";
import createRoutes from "./core/routes";


const app = express();
const port = 5000;

const http = createServer(app);
const io = createSocket(http);

app.use(express.json());


// #Cookie session
import cookieSession from "cookie-session";
app.use(
  cookieSession({
    secret: process.env.COOKIE_SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    httpOnly: true,
    secure: false,
  })
);

createRoutes(app, io);

//# mongoDB
import "./core/db";

http.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
