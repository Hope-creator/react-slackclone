import React from "react";
import { IUser } from "../store/modules/user/types";
import defaultAvatar from "../images/defaultAvatar.png";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import { CircularProgress } from "@material-ui/core";
import { userApi } from "../services/api/userApi";

interface IAddPeopleFormPopoverProps {
  opener: React.ReactNode;
  username: string;
  isUserSelected: boolean;
  setUserFunction: (user: IUser) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 600,
      maxHeight: 300,
      textAlign: "center",
    },
  })
);

export const AddPeopleFormPopover: React.FC<IAddPeopleFormPopoverProps> = ({
  opener,
  username,
  isUserSelected,
  setUserFunction,
}: IAddPeopleFormPopoverProps): React.ReactElement => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [searchUserLoading, setSearchUserLoading] =
    React.useState<boolean>(false);

  const div = React.useRef(null);

  const classes = useStyles();

  const handleKeyPress = (event: React.KeyboardEvent): any => {
    if (!isUserSelected) {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log(username);
        event.preventDefault();
        setSearchUserLoading(true);
        setIsOpen(true);
        userApi
          .getUsersByNameOrEmail(username)
          .then((users) => {
            setUsers(users);
            setSearchUserLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setSearchUserLoading(false);
          });
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const open = isOpen;
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div ref={div} onKeyDown={handleKeyPress} style={{ cursor: "pointer" }}>
        {opener}
      </div>
      <Popover
        classes={{ paper: classes.paper }}
        anchorEl={div.current}
        id={id}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {searchUserLoading ? (
          <CircularProgress />
        ) : users.length > 0 ? (
          users.map((user: IUser) => (
            <ListItem
              button
              onClick={() => {
                setUserFunction(user);
                handleClose();
              }}
            >
              <Grid container justify="space-between">
                <Grid item container alignItems="center" xs={10}>
                  <Avatar
                    style={{ marginRight: 10 }}
                    src={user.avatar || defaultAvatar}
                  />
                  <Typography>{user.name}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))
        ) : (
          <Typography variant="h6">
            No matches found - Try using their email instead
          </Typography>
        )}
      </Popover>
    </div>
  );
};
