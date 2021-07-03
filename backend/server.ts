import express from "express";
import path from "path";
import "./core/db";
import { createServer } from "http";
import createSocket from "./core/socket";
import createRoutes from "./core/routes";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

const http = createServer(app);
const io = createSocket(http);

app.use(express.json());

// #Cookie session
app.use(
  cookieSession({
    secret: process.env.COOKIE_SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    httpOnly: true,
    secure: false,
  })
);

createRoutes(app, io);

// For build
const staticPath = path.join(__dirname, "../build")
app.use(express.static(staticPath));
const index = path.join(__dirname, "../build/index.html")
app.get("*", (req, res) => {
    res.sendFile(index);
});

http.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
