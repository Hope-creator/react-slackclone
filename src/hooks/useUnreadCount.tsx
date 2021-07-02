import React from "react";
import { messagesApi } from "../services/api/messagesApi";
import socket from "../services/socket/socket";
import { IMessage } from "../store/modules/messages/types";

export const useUnreadCount = () => {
  const [unreadCount, setUnreadCount] = React.useState<number>(0);

  const handleListenerUnread = React.useCallback((message: IMessage) => {
    setUnreadCount((prev) => ++prev);
  }, []);

  const handleListenerReadOne = React.useCallback(() => {
    setUnreadCount((prev) => --prev);
  }, []);

  const handleListenerReadAll = React.useCallback(() => {
    setUnreadCount(0);
  }, []);

  React.useEffect(() => {
    messagesApi
      .getUnreadCount()
      .then((unreadNum) => setUnreadCount(unreadNum))
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    socket.on("SERVER:NEW_UNREAD", handleListenerUnread);
    return function cleanUp() {
      socket.removeEventListener("SERVER:NEW_UNREAD", handleListenerUnread);
    };
  }, [handleListenerUnread]);

  React.useEffect(() => {
    socket.on("SERVER:READ_ONE", handleListenerReadOne);
    return function cleanUp() {
      socket.removeEventListener("SERVER:READ_ONE", handleListenerReadOne);
    };
  }, [handleListenerReadOne]);

  React.useEffect(() => {
    socket.on("SERVER:READ_ALL", handleListenerReadAll);
    return function cleanUp() {
      socket.removeEventListener("SERVER:READ_ALL", handleListenerReadAll);
    };
  }, [handleListenerReadAll]);

  return unreadCount;
};
