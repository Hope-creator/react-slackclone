import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IUser } from "../../../../store/modules/user/types";
import { IDialog } from "../../../../store/modules/dialogs/types";
import { DialogItem } from "../../../DialogItem";

export interface IAlldialogsContentProps {
  dialogs: IDialog[];
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    workspaceContentMessages: {
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(29,28,29,.52)",
        borderRadius: "4px",
      },
    },
  })
);

export const AlldialogsContent: React.FC<IAlldialogsContentProps> = ({
  dialogs,
  user,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        item
        className={classes.workspaceContentMessages}
        direction="column"
        wrap="nowrap"
      >
        {dialogs.map((dialog) => (
          <DialogItem user={user} key={dialog._id} dialog={dialog} />
        ))}
      </Grid>
    </>
  );
};
