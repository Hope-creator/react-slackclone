import React from "react";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Member } from "./Member";
import { IUser } from "../../../../store/modules/user/types";
import { MembersSearchForm } from "../../../MembersSearchForm";

export interface IMembersContentProps {
  members: IUser[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: "auto",
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.primary.light,
        borderRadius: "4px",
      },
    },
    formContainer: {
      margin: 10,
    },
  })
);

export const MembersContent: React.FC<IMembersContentProps> = ({
  members,
}: IMembersContentProps) => {
  const classes = useStyles();

  const [searchName, setSearchName] = React.useState<string>("");

  const setName = (name: string) => {
    setSearchName(name);
  };

  return (
    <>
      <Box className={classes.formContainer}>
        <MembersSearchForm formSubmit={setName} />
      </Box>
      <Grid container wrap="wrap" className={classes.root}>
        {(
          (searchName &&
            members.filter((member) => member.name === searchName)) ||
          members
        ).map((member) => (
          <Member member={member} />
        ))}
      </Grid>
    </>
  );
};
