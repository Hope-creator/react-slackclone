import React from "react";
import { conversationsApi } from "../services/api/converastionsApi";
import { IConversation } from "../store/modules/conversations/types";
import { ConversationEditModal } from "./ConversationEditModal";

interface IDescriptionEditModalProps {
  conversation: IConversation;
  opener: React.ReactNode;
}

export const DescriptionEditModal: React.FC<IDescriptionEditModalProps> = ({
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
      .updateConversation(conversation._id, undefined, undefined, value)
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
      edit={conversation.description}
      textHeader={"Edit description"}
      textFooter={"Let people know what this channel is for."}
      errorMessage={errorMessage}
      saveHandle={handleSave}
    />
  );
};
