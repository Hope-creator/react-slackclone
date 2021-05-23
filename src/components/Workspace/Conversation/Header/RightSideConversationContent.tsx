import React from "react";
import { IConversation } from "../../../../store/modules/conversations/types";
import { useDispatch } from "react-redux";
import { MembersModal } from "../../../MembersModal";
import { fetchCurrentInfoChannel } from "../../../../store/modules/currentInfo_side/currentInfo";
import { AddPeopleModal } from "../../../AddPeopleModal";

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { IUser } from "../../../../store/modules/user/types";

interface IRightSideConversationContentProps {
  conversation: IConversation;
}

export const RightSideConversationContent: React.FC<IRightSideConversationContentProps> =
  ({ conversation }: IRightSideConversationContentProps) => {
    const dispatch = useDispatch();

    const infoButtonHandleClick = () => {
      if (conversation) dispatch(fetchCurrentInfoChannel(conversation._id));
    };

    return (
      <>
        <Tooltip
          title={`View all ${conversation.num_members} members`}
          aria-label={`View all ${conversation.num_members} members`}
        >
          <MembersModal
            name={conversation.name}
            users={conversation.members as IUser[]}
            opener={<IconButton>{conversation.members.length}</IconButton>}
          />
        </Tooltip>
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
