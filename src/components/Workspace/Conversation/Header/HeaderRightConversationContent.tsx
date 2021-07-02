import React from "react";
import { IConversation } from "../../../../store/modules/conversations/types";
import { useDispatch } from "react-redux";
import { MembersModal } from "../../../MembersModal";
import { fetchInfoSideChannel } from "../../../../store/modules/infoSide/infoSide";
import { AddPeopleModal } from "../../../AddPeopleModal";

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

interface IHeaderRightConversationContentProps {
  conversation: IConversation;
}

export const HeaderRightConversationContent: React.FC<IHeaderRightConversationContentProps> =
  ({ conversation }) => {
    const dispatch = useDispatch();

    const infoButtonHandleClick = () => {
      dispatch(fetchInfoSideChannel(conversation._id));
    };

    return (
      <>
        <MembersModal
          conversation={conversation}
          opener={
            <Tooltip
              title={`View all ${conversation.num_members} members`}
              aria-label={`View all ${conversation.num_members} members`}
            >
              <IconButton>{conversation.num_members}</IconButton>
            </Tooltip>
          }
        />
        <AddPeopleModal
          opener={
            <Tooltip title={`Add people`} aria-label={`Add people`}>
              <IconButton size="small">
                <PersonAddIcon />
              </IconButton>
            </Tooltip>
          }
          conversation={conversation}
        />
        <Tooltip
          title="Show conversation details"
          aria-label="Show conversation details"
        >
          <IconButton size="small" onClick={infoButtonHandleClick}>
            <ErrorOutlineIcon />
          </IconButton>
        </Tooltip>
      </>
    );
  };
