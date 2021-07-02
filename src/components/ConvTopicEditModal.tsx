import React from "react";
import { conversationsApi } from "../services/api/conversationsApi";
import { IConversation } from "../store/modules/conversations/types";
import { ConversationEditModal } from "./ConversationEditModal";

interface IConvTopicEditModalProps {
  conversation: IConversation;
  opener: React.ReactNode;
}

export const ConvTopicEditModal: React.FC<IConvTopicEditModalProps> = ({
  conversation,
  opener,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleOpen = () => {
    setErrorMessage("");
    setOpen(true);
  };

  const handleClose = () => {
    setErrorMessage("");
    setOpen(false);
  };

  const handleCloseError = () => {
    setErrorMessage("");
  };

  const handleSave = (value: string) => {
    conversationsApi
      .updateConversation(conversation._id, undefined, value, undefined)
      .then((response) => setOpen(false))
      .catch((error) => {
        if (error.request.response) {
          setErrorMessage(JSON.parse(error.request.response).data);
        } else {
          setErrorMessage("Something went wrong");
        }
      });
  };

  return (
    <ConversationEditModal
      opener={opener}
      open={open}
      handleClose={handleClose}
      handleOpen={handleOpen}
      handleCloseError={handleCloseError}
      edit={conversation.topic}
      textHeader={"Edit topic"}
      textFooter={`Let people know what #${(
        <b>{conversation.name}</b>
      )} is focused on right
      now. Topics are always visible in the header.`}
      errorMessage={errorMessage}
      saveHandle={handleSave}
    />
  );
};
