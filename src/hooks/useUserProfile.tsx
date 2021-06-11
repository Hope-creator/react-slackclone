import React from "react";
import { userApi } from "../services/api/userApi";
import { IUser } from "../store/modules/user/types";

export const useUserProfile = (id?: string) => {
  const [user, setUserProfile] = React.useState<IUser | null>(null);

  React.useEffect(() => {
    if (id) {
      userApi
        .getUser(id)
        .then((user) => setUserProfile(user))
        .catch((err) => console.log(err));
    }
  }, [id]);

  return user;
};
