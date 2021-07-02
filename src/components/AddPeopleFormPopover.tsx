import React from "react";
import { IUser } from "../store/modules/user/types";
import InfiniteScroll from "react-infinite-scroll-component";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import { CircularProgress } from "@material-ui/core";
import { userApi } from "../services/api/userApi";
import { AvatarWithBadge } from "./AvatarWithBadge";

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
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalCount, setTotalCount] = React.useState<number>(30);

  const div = React.useRef(null);

  const classes = useStyles();

  const fetchDataUsers = () => {
    userApi
      .getAllUsers(username, page, 20) // 20 is count
      .then((res) => {
        setUsers((prev) => [...prev, ...res.results]);
        setTotalCount(res.totalCount ? res.totalCount : 0);
        setPage((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent): any => {
    if (!isUserSelected) {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        setIsOpen(true);
        fetchDataUsers();
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setUsers([]);
    setPage(1);
    setTotalCount(30);
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
        <InfiniteScroll
          height={300}
          dataLength={users.length}
          next={() => fetchDataUsers()}
          hasMore={page * 20 < totalCount} // 20 is count
          loader={<CircularProgress />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>
                {totalCount > 0
                  ? "That's all matched users"
                  : "No matches found"}
              </b>
            </p>
          }
        >
          {users.map((user: IUser) => (
            <ListItem
              key={user._id}
              button
              onClick={() => {
                setUserFunction(user);
                handleClose();
              }}
            >
              <Grid container justify="space-between">
                <Grid item container alignItems="center" xs={10}>
                  <AvatarWithBadge user={user} style={{ marginRight: 10 }} />
                  <Typography>{user.name}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </InfiniteScroll>
      </Popover>
    </div>
  );
};
