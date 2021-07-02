import io from "socket.io-client";

const socket = io({ reconnectionAttempts: 3 });

socket.on("connect", () => {
  sessionStorage.setItem("connection", "1");
});

socket.on("connect_error", (err: any) => {
  socket.disconnect();
  sessionStorage.setItem("connection", "0");
  console.log(err instanceof Error); // true
  console.log(err.message); // not authorized
});

export default socket;
