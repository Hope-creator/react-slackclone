import { authencticateToken } from './utils/middleware/checkAuth';
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { UserCtrl } from "./controllers/UserController";
import { registerValidators } from "./validations/register";
import { AuthCtrl } from "./controllers/AuthController";

const app = express();
const port = 5000;

app.use(express.json());

// #Cookie session
import coockieSession from 'cookie-session'
app.use(coockieSession({
  secret: process.env.COOKIE_SESSION_SECRET,
  maxAge: 1000 * 60 * 60 * 24 * 14,
  httpOnly: true,
  secure: false,
}))



//# mongoDB
import "./core/db";
import { loginValidators } from './validations/login';
import { CompanyCtrl } from './controllers/CompanyController';

// # Routes
app.get("/api/users", UserCtrl.index);
app.get("/api/users/:id",authencticateToken, UserCtrl.show);
app.get("/api/company/:id",authencticateToken, CompanyCtrl.show);
app.post("/api/auth/login",loginValidators, AuthCtrl.login)
app.post("/api/auth/register", registerValidators, AuthCtrl.create);
app.get("/api/auth/verification/verify-account/:userId/:secretCode", authencticateToken, AuthCtrl.verify);
//app.put('/users', UserCtrl.update)
//app.delete('/users', UserCtrl.delete)

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
