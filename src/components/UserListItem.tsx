import React from "react";
import {
  Button,
  Grid,
  ListItem,
  Typography,
  Box,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { IUser } from "../store/modules/user/types";
import { UserPopover } from "./UserPopover";
import { AvatarWithBadge } from "./AvatarWithBadge";
import { IConversation } from "../store/modules/conversations/types";
import { conversationsApi } from "../services/api/conversationsApi";
import CloseIcon from "@material-ui/icons/Close";

interface IUserListItemProps {
  user: IUser;
  isMe: boolean;
  conversation: IConversation;
}

export const UserListItem: React.FC<IUserListItemProps> = ({
  user,
  isMe,
  conversation,
}) => {
  const [error, setError] = React.useState<string>("");

  const setErrorEmpty = () => {
    setError("");
  };

  const kickUserHandleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    conversationsApi
      .kickMember(conversation._id, user._id)
      .then()
      .catch((error) => {
        if (error.request.response) {
          setError(JSON.parse(error.request.response).data);
        } else {
          setError("Something went wrong");
        }
      });
  };

  return (
    <UserPopover
      anchorOriginBlockHorizontal="center"
      anchorOriginBlockVertical="center"
      anchorPopupBlockHorizontal="center"
      anchorPopupBlockVertical="center"
      opener={
        <Box height={60}>
          <ListItem button>
            <Grid container justify="space-between" wrap="nowrap">
              <Grid item container wrap="nowrap" alignItems="center" xs={10}>
                <AvatarWithBadge user={user} style={{ marginRight: 10 }} />
                <Typography
                  style={{
                    width: "auto",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {user.name} {isMe && "(you)"}
                </Typography>
              </Grid>
              {!isMe && (
                <Grid item>
                  <Button onClick={kickUserHandleClick}>Remove</Button>
                </Grid>
              )}
            </Grid>
          </ListItem>
          <div onClick={(e) => e.stopPropagation()}>
            <Snackbar
              open={!!error}
              autoHideDuration={6000}
              onClose={setErrorEmpty}
              message={error}
              action={
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={setErrorEmpty}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            />
          </div>
        </Box>
      }
      user={user}
    />
  );
};
