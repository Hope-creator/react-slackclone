import { Box } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import socket from "../../services/socket/socket";
import { IConversation } from "../../store/modules/conversations/types";
import { updateCurrentInfoConversation } from "../../store/modules/currentInfo_side/currentInfo";
import { InfoItemTypeState } from "../../store/modules/currentInfo_side/types";
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
}

export const RightSideBlock: React.FC<RightSideBlockProps> = ({
  type,
  item,
}) => {
  const dispatch = useDispatch();

  const conversationUpdateHandleListener = React.useCallback(
    (_conversation: IConversation) => {
      if (
        type === InfoItemTypeState.CHANNEL &&
        item._id === _conversation._id
      ) {
        dispatch(updateCurrentInfoConversation(_conversation));
      }
    },
    [dispatch, type, item._id]
  );

  React.useEffect(() => {
    if (type === InfoItemTypeState.CHANNEL) {
      socket.on("SERVER:CONVERSATION_UPDATE", conversationUpdateHandleListener);
    }
    return function clearConnect() {
      socket.removeListener(
        "SERVER:CONVERSATION_UPDATE",
        conversationUpdateHandleListener
      );
    };
  }, [dispatch, conversationUpdateHandleListener, type]);

  if (type === InfoItemTypeState.CHANNEL) {
    return (
      <Box>
        <Header headerSubText={item.name} headerTitle="Details" />
        <ContentButtons channel={item as IConversation} />
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
