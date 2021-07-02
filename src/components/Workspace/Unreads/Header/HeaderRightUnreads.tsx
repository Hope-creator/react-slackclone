import React from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";

import { fetchReadingAllMessagesUnread } from "../../../../store/modules/messagesAffect/messagesAffect";
import { IMessage } from "../../../../store/modules/messages/types";

interface IHeaderRightUnreadsProps {
  messages: IMessage[];
}

export const HeaderRightUnreads: React.FC<IHeaderRightUnreadsProps> = ({
  messages,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchReadingAllMessagesUnread(messages));
  };

  return (
    <Button style={{ minWidth: 100 }} onClick={handleClick}>
      Mark all as read
    </Button>
  );
};
