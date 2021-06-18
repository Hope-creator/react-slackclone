import { Server, Socket } from "socket.io";
import http from "http";
import cookie from "cookie";
import { checkAuthByToken } from "../utils/function/checkAuthByToken";

interface ISocket extends Socket {
  user?: string;
  conversationId?: string;
  dialogId?: string;
  // other additional attributes here, example:
  // surname?: string;
}

const socket = (http: http.Server) => {
  const io = new Server(http, {
    cors: {
      origin: "*",
    },
  });
  io.use((socket: ISocket, next) => {
    const _cookie = socket.handshake.headers["cookie"];
    if (_cookie) {
      const parsedCookie = cookie.parse(_cookie)["express:sess"];
      const token = JSON.parse(Buffer.from(parsedCookie, "base64").toString())[
        "token"
      ];
      const userId = checkAuthByToken(token);
      if (userId) {
        socket.user = userId;
        next();
      } else {
        const err = new Error("token is invalid");
        next(err);
      }
    } else {
      const err = new Error("not authorized");
      next(err);
    }
  });

  io.on("connection", function (socket: ISocket) {
    if (socket.user) socket.join(socket.user);
    socket.on("CONVERSATION:JOIN", (conversationId: string) => {
      socket.conversationId = conversationId;
      socket.join(conversationId);
    });
    socket.on("CONVERSATION:LEAVE", () => {
      if (socket.conversationId) socket.leave(socket.conversationId);
    });
    socket.on("DIALOG:JOIN", (dialogId: string) => {
      socket.dialogId = dialogId;
      socket.join(dialogId);
    });
    socket.on("DIALOG:LEAVE", () => {
      if (socket.dialogId) socket.leave(socket.dialogId);
    });
    socket.on("DIALOGS:TYPING", (obj: any) => {
      socket.broadcast.emit("DIALOGS:TYPING", obj);
    });
  });

  return io;
};

export default socket;
