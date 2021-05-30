import React from "react";
import { messagesApi } from "../services/api/messagesApi";
import socket from "../services/socket/socket";

export const useUnreadCount = (id: string) => {
  const [unreadCount, setUnreadCount] = React.useState<number>(0);

  React.useEffect(() => {
    messagesApi
      .getUnread(id)
      .then((unreadNum) => setUnreadCount(unreadNum))
      .catch((err) => console.log(err));
    socket.on("SERVER:NEW_UNREAD", (_id: string) => {
      _id === id && setUnreadCount((prev) => ++prev);
    });
  }, [id]);

  return unreadCount;
};
