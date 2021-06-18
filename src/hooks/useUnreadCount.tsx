import React from "react";
import { messagesApi } from "../services/api/messagesApi";
import socket from "../services/socket/socket";
import { IMessage } from "../store/modules/messages/types";

export const useUnreadCount = (id: string) => {
  const [unreadCount, setUnreadCount] = React.useState<number>(0);

  const handleListenerUnread = React.useCallback(
    (message: IMessage) => {
      console.log(message);
      message.dest === id && setUnreadCount((prev) => ++prev);
    },
    [id]
  );

  const handleListenerReadOne = React.useCallback(
    (messageDest: string) => {
      messageDest === id && setUnreadCount((prev) => --prev);
    },
    [id]
  );

  const handleListenerReadAll = React.useCallback(() => {
    setUnreadCount(0);
  }, []);

  const handleListenerReadAllConversation = React.useCallback(
    (conversation: string) => {
      conversation === id && setUnreadCount(0);
    },
    [id]
  );

  React.useEffect(() => {
    messagesApi
      .getUnreadCount(id)
      .then((unreadNum) => setUnreadCount(unreadNum))
      .catch((err) => console.log(err));
  }, [id]);

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

  React.useEffect(() => {
    socket.on(
      "SERVER:READ_ALL_CONVERSATION",
      handleListenerReadAllConversation
    );
    return function cleanUp() {
      socket.removeEventListener(
        "SERVER:READ_ALL",
        handleListenerReadAllConversation
      );
    };
  }, [handleListenerReadAllConversation]);

  return unreadCount;
};
