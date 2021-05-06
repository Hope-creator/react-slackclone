import React from "react";
import { GetStarted } from "./pages/GetStarted";
import { SignIn } from "./pages/SignIn";
import { Redirect, Route, Switch } from "react-router";
import { Company } from "./pages/Company";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./store/modules/user/user";
import {
  selectUser,
  selectUserLoadingState,
} from "./store/modules/user/selectors";
import { LoadingUserState } from "./store/modules/user/types";
import { CentralCircularProgress } from "./components/CentralCircularProgress";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userLoadingState = useSelector(selectUserLoadingState);

  React.useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  if (
    userLoadingState !== LoadingUserState.LOADED
  )
    return <CentralCircularProgress size={80} />;
  return (
    <div>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/get-started" component={GetStarted} />
        <Route path={["/", "/:teamId"]} component={Company}>
          {!user && <Redirect to="signin" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
