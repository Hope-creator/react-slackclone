import express from "express";
import socket from "socket.io";
import {
  AuthController,
  CompanyController,
  ConversationController,
  FileController,
  MarkedMessageController,
  UserController,
  UnreadMessagesController,
  ConversationMembersController,
  DirectMessagesController,
} from "../controllers";
import MessagesController from "../controllers/MessagesController";
import { authencticateToken } from "../utils/middleware/checkAuth";
import { loginValidators } from "../validations/login";
import { registerValidators } from "../validations/register";
import upload from "./multer";

const createRoutes = (app: express.Express, io: socket.Server) => {
  const AuthCtrl = new AuthController(io);
  const CompanyCtrl = new CompanyController();
  const ConversationCtrl = new ConversationController(io);
  const ConversationMembersCtrl = new ConversationMembersController(io);
  const UserCtrl = new UserController();
  const MessagesCtrl = new MessagesController(io);
  const DirectMessageCtrl = new DirectMessagesController(io);
  const MarkedMessageCtrl = new MarkedMessageController();
  const UnreadMessagesCtrl = new UnreadMessagesController(io);
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
  app.post("/api/auth/update", authencticateToken, AuthCtrl.update);

  app.post("/api/auth/register", registerValidators, AuthCtrl.create);
  app.post("/api/auth/logout", registerValidators, AuthCtrl.delete);

  app.get(
    "/api/auth/verification/verify-account/:userId/:secretCode",
    authencticateToken,
    AuthCtrl.verify
  );

  //# Company
  app.get("/api/company/:id", authencticateToken, CompanyCtrl.show);

  //# Conversation Members
  app.get(
    "/api/conversations/members/:id",
    authencticateToken,
    ConversationMembersCtrl.index
  );
  app.post(
    "/api/conversations/members/add",
    authencticateToken,
    ConversationMembersCtrl.create
  );
  app.post(
    "/api/conversations/members/join",
    authencticateToken,
    ConversationMembersCtrl.join
  );
  app.post(
    "/api/conversations/members/kick",
    authencticateToken,
    ConversationMembersCtrl.delete
  );

  //# Conversation
  app.get("/api/conversations", authencticateToken, ConversationCtrl.index);
  app.get("/api/conversations/:id", authencticateToken, ConversationCtrl.show);
  app.post("/api/conversations", authencticateToken, ConversationCtrl.create);
  app.post(
    "/api/conversations/update",
    authencticateToken,
    ConversationCtrl.update
  );

  app.post(
    "/api/conversations/100",
    authencticateToken,
    ConversationCtrl.create100
  );

  //# Direct Messages
  app.get("/api/messages/dm/:id", authencticateToken, DirectMessageCtrl.index);
  app.post("/api/messages/dm", authencticateToken, DirectMessageCtrl.create);

  //# Mark Messages
  app.get("/api/messages/mark", authencticateToken, MarkedMessageCtrl.index);
  app.post("/api/messages/mark", authencticateToken, MarkedMessageCtrl.create);
  app.patch("/api/messages/mark", authencticateToken, MarkedMessageCtrl.delete);

  //# Unread Messages
  app.get("/api/messages/unread", authencticateToken, UnreadMessagesCtrl.index);
  app.get(
    "/api/messages/unread/count",
    authencticateToken,
    UnreadMessagesCtrl.count
  );
  app.patch(
    "/api/messages/unread",
    authencticateToken,
    UnreadMessagesCtrl.delete
  );
  app.patch(
    "/api/messages/unread/one",
    authencticateToken,
    UnreadMessagesCtrl.deleteOne
  );

  //# Messages
  app.get("/api/messages/get/:id", authencticateToken, MessagesCtrl.index);
  app.post("/api/messages/create/:id", authencticateToken, MessagesCtrl.create);
  app.post("/api/messages/delete", authencticateToken, MessagesCtrl.delete);

  //# Files
  app.post(
    "/api/files/upload",
    authencticateToken,
    upload.array("images", 10),
    FileCtrl.upload
  );
  app.post(
    "/api/files/avatar",
    authencticateToken,
    upload.single("avatar"),
    FileCtrl.avatar
  );

  //# Test
  app.post("/api/test/create500users", AuthCtrl.create500Test);
};

export default createRoutes;
