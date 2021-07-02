import React from "react";
import { GetStarted } from "./pages/GetStarted";
import { SignIn } from "./pages/SignIn";
import { Redirect, Route, Switch } from "react-router";
import { Company } from "./pages/Company";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, setUser } from "./store/modules/user/user";
import {
  selectUser,
  selectUserLoadingState,
} from "./store/modules/user/selectors";
import { IUser, LoadingUserState } from "./store/modules/user/types";
import { CentralCircularProgress } from "./components/CentralCircularProgress";
import socket from "./services/socket/socket";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userLoadingState = useSelector(selectUserLoadingState);

  React.useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  const onConnectListener = React.useCallback(
    (user: IUser) => {
      dispatch(setUser(user));
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (user) {
      const isConnected = sessionStorage.getItem("connection");
      if (isConnected === "0") {
        socket.connect();
        sessionStorage.setItem("connection", "1");
      }
      socket.on("SERVER:SOCKET_CONNECTED", onConnectListener);
    }
    return function cleanUp() {
      socket.removeListener("SERVER:SOCKET_CONNECTED", onConnectListener);
    };
  }, [user, onConnectListener]);

  if (userLoadingState === LoadingUserState.LOADING)
    return <CentralCircularProgress size={80} />;
  return (
    <div>
      <Switch>
        <Route path="/signin" component={SignIn}>
          {user && <Redirect to="/" />}
        </Route>
        <Route path="/get-started" component={GetStarted}>
          {user && <Redirect to="/" />}
        </Route>
        <Route path={["/", "/:teamId"]} component={Company}>
          {!user && <Redirect to="/signin" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
