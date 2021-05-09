import express from "express";
import socket from "socket.io";
import {
  AuthController,
  CompanyController,
  ConversationController,
  UserController,
} from "../controllers";
import MessagesController from "../controllers/MessagesController";
import { authencticateToken } from "../utils/middleware/checkAuth";
import { loginValidators } from "../validations/login";
import { registerValidators } from "../validations/register";

const createRoutes = (app: express.Express, io: socket.Server) => {
  const AuthCtrl = new AuthController();
  const CompanyCtrl = new CompanyController();
  const ConversationCtrl = new ConversationController(io);
  const UserCtrl = new UserController();
  const MessagesCtrl = new MessagesController(io);
  // # Users
  app.get("/api/users", UserCtrl.index);
  app.get("/api/users/:id", authencticateToken, UserCtrl.show);

  //# Auth
  app.get("/api/auth/me", authencticateToken, AuthCtrl.getMe);
  app.post("/api/auth/login", loginValidators, AuthCtrl.login);
  app.post("/api/auth/register", registerValidators, AuthCtrl.create);
  app.get(
    "/api/auth/verification/verify-account/:userId/:secretCode",
    authencticateToken,
    AuthCtrl.verify
  );

  //# Company
  app.get("/api/company/:id", authencticateToken, CompanyCtrl.show);

  //# Conversation
  app.get("/api/conversations", authencticateToken, ConversationCtrl.index);
  app.post("/api/conversations", authencticateToken, ConversationCtrl.create);

  //#Messages 
  app.get("/api/conversations/:id", authencticateToken, MessagesCtrl.index);
  app.post("/api/conversations/:id", authencticateToken, MessagesCtrl.create);

};

export default createRoutes;
