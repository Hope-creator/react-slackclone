import React from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";

import { fetchReadingAllMessagesUnread } from "../../../../store/modules/readMessage/readMessage";
import { IMessage } from "../../../../store/modules/messages/types";

interface IRightSIdeUnreadsProps {
  messages: IMessage[];
}

export const RightSideUnreads: React.FC<IRightSIdeUnreadsProps> = ({
  messages,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchReadingAllMessagesUnread(messages));
  };

  return <Button onClick={handleClick}>Mark all as read</Button>;
};
