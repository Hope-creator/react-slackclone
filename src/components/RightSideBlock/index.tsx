import { Box } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import socket from "../../services/socket/socket";
import { IConversation } from "../../store/modules/conversations/types";
import {
  clearInfoSideConversation,
  updateInfoSideConversation,
} from "../../store/modules/infoSide/infoSide";
import { InfoItemTypeState } from "../../store/modules/infoSide/types";
import { IUser } from "../../store/modules/user/types";
import { Accordeons } from "./Accordions/Accordions";
import { Files } from "./Accordions/Files";
import { ContentButtons } from "./ContentButtons";
import Header from "./Header";
import ProfileInfo from "./ProfileInfo";

interface RightSideBlockProps {
  headerSubText?: string;
  type: InfoItemTypeState;
  item: IUser | IConversation;
  user: IUser;
}

export const RightSideBlock: React.FC<RightSideBlockProps> = ({
  type,
  item,
  user
}) => {
  const dispatch = useDispatch();


  const conversationUpdateHandleListener = React.useCallback(
    (_conversation: IConversation) => {
        dispatch(updateInfoSideConversation(_conversation));
    },
    [dispatch]
  );

  const conversationKickedHandleListener = React.useCallback(
    (_conversation: IConversation) => {
      if (
        _conversation.is_private ) {
        dispatch(clearInfoSideConversation(_conversation._id));
      }
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (type === InfoItemTypeState.CHANNEL) {
      socket.on("SERVER:CONVERSATION_UPDATE", conversationUpdateHandleListener);
      socket.on("SERVER:CONVERSATION_KICKED", conversationKickedHandleListener);
    }
    return function clearConnect() {
      socket.removeListener(
        "SERVER:CONVERSATION_UPDATE",
        conversationKickedHandleListener
      );
    };
  }, [
    dispatch,
    type,
    conversationUpdateHandleListener,
    conversationKickedHandleListener,
  ]);

  if (type === InfoItemTypeState.CHANNEL) {
    return (
      <Box>
        <Header headerSubText={item.name} headerTitle="Details" />
        <ContentButtons me={user} channel={item as IConversation} />
        <Accordeons channel={item as IConversation} />
        <Files />
      </Box>
    );
  }
  if (type === InfoItemTypeState.PROFILE) {
    return (
      <Box>
        <Header headerTitle="Profile" />
        <ProfileInfo user={item as IUser} />
      </Box>
    );
  }

  return null;
};
