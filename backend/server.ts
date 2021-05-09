import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import createSocket from "./core/socket";
import createRoutes from "./core/routes";

dotenv.config();

const app = express();
const port = 5000;

const http = createServer(app);
const io = createSocket(http);

app.use(express.json());

// #Cookie session
import coockieSession from "cookie-session";
app.use(
  coockieSession({
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
