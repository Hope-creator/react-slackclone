import React from 'react';
import { IUser } from '../../../../store/modules/user/types';
import {
    Grid,
    Typography
  } from "@material-ui/core";

interface IAboutUserProps {
    user: IUser;
}

export const AboutUser: React.FC<IAboutUserProps> = ({user}) => {
    return (
        <Grid container direction="column">
              <Typography variant="subtitle1">Display name</Typography>
              <Typography variant="subtitle2">{user.display_name}</Typography>
            </Grid>
    )
}
