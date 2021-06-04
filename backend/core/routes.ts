import express from "express";
import socket from "socket.io";
import {
  AuthController,
  CompanyController,
  ConversationController,
  FileController,
  MarkedMessageController,
  UserController,
} from "../controllers";
import MessagesController from "../controllers/MessagesController";
import { authencticateToken } from "../utils/middleware/checkAuthWithUpdate";
import { loginValidators } from "../validations/login";
import { registerValidators } from "../validations/register";
import upload from "./multer";

const createRoutes = (app: express.Express, io: socket.Server) => {
  const AuthCtrl = new AuthController();
  const CompanyCtrl = new CompanyController();
  const ConversationCtrl = new ConversationController(io);
  const UserCtrl = new UserController();
  const MessagesCtrl = new MessagesController(io);
  const MarkedMessageCtrl = new MarkedMessageController(io);
  const FileCtrl = new FileController();

  // # Users
  app.get("/api/users", UserCtrl.index);
  app.get("/api/users/:id", authencticateToken, UserCtrl.show);
  app.get(
    "/api/users/name/:query",
    authencticateToken,
    UserCtrl.showByNameOrEmail
  );

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
  app.get("/api/conversations/:id", authencticateToken, ConversationCtrl.show);
  app.get(
    "/api/conversations/populated/:id",
    authencticateToken,
    ConversationCtrl.showPopulate
  );
  app.post("/api/conversations", authencticateToken, ConversationCtrl.create);
  app.patch(
    "/api/conversations/joinall",
    authencticateToken,
    ConversationCtrl.joinAll
  );
  app.patch(
    "/api/conversations/addusers",
    authencticateToken,
    ConversationCtrl.addUsers
  );

  //# Messages
  app.patch("/api/messages/readall", authencticateToken, MessagesCtrl.readAll);
  app.patch(
    "/api/messages/readone/message",
    authencticateToken,
    MessagesCtrl.readOneByMessageId
  );
  app.patch(
    "/api/messages/readone/conversation",
    authencticateToken,
    MessagesCtrl.readAllByConversationId
  );

  app.get(
    "/api/messages/unread/:id",
    authencticateToken,
    MessagesCtrl.getUnreadCountById
  );
  app.get(
    "/api/messages/allunread",
    authencticateToken,
    MessagesCtrl.getUnread
  );
  app.get("/api/messages/:id", authencticateToken, MessagesCtrl.index);
  app.post("/api/messages/:id", authencticateToken, MessagesCtrl.create);

  //# Mark Messages
  app.get("/api/mark", authencticateToken, MarkedMessageCtrl.index);
  app.post("/api/mark", authencticateToken, MarkedMessageCtrl.create);
  app.delete("/api/mark/:id", authencticateToken, MarkedMessageCtrl.delete);

  //# Files
  app.post(
    "/api/files/upload",
    authencticateToken,
    upload.array("images", 10),
    FileCtrl.upload
  );
};

export default createRoutes;
