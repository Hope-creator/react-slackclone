import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { UserCtrl } from "./controllers/UserController";
import { registerValidators } from "./validations/register";
import { AuthCtrl } from "./controllers/AuthController";

const app = express();
const port = 5000;

app.use(express.json());

app.get("/api/users", UserCtrl.index);
app.post("/api/auth/register", registerValidators, AuthCtrl.create);
app.get("/api/auth/verification/verify-account/:userId/:secretCode", AuthCtrl.verify);
//app.put('/users', UserCtrl.update)
//app.delete('/users', UserCtrl.delete)

//# mongoDB
import "./core/db";

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
