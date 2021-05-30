import io from "socket.io-client";

const socket = io({reconnectionAttempts: 3});

socket.on("connect_error", (err: any) => {
  socket.disconnect()
  console.log(err instanceof Error); // true
  console.log(err.message); // not authorized
});

export default socket;