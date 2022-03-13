import { Server, Socket } from "socket.io";
import http from "http";
import cookie from "cookie";
import { checkAuthByToken } from "../utils/function/checkAuthByToken";
import { IUserDocument, UserModel } from "../models/UserModel";

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
      const parsedCookie = cookie.parse(_cookie)["session"];
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
    if (socket.user) {
      UserModel.findByIdAndUpdate(
        socket.user,
        {
          online: true,
        },
        { new: true }
      )
        .populate("company")
        .then((user: IUserDocument | null) => {
          io.emit("SERVER:UPDATE_USER", user);
          io.to(socket.id).emit("SERVER:SOCKET_CONNECTED", user);
        })
        .catch((e: any) =>
          console.log(
            "Error on socket: connect / update user by connection:",
            e
          )
        );
    }
    if (socket.user) socket.join(socket.user);
    socket.on("CONVERSATION:JOIN", (conversationId: string) => {
      socket.conversationId = conversationId;
      socket.join(conversationId);
    });
    socket.on("CONVERSATION:LEAVE", () => {
      if (socket.conversationId) socket.leave(socket.conversationId);
    });

    socket.on("disconnect", () => {
      if (socket.user) {
        UserModel.findByIdAndUpdate(
          socket.user,
          {
            online: false,
          },
          { new: true }
        )
          .populate("company")
          .then((user: IUserDocument | null) =>
            io.emit("SERVER:UPDATE_USER", user)
          )
          .catch((e: any) =>
            console.log(
              "Error on socket: disconnect / update user by connection:",
              e
            )
          );
      }
    });
  });

  return io;
};

export default socket;
