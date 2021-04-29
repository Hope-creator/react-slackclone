import React from "react";
import { GetStarted } from "./pages/GetStarted";
import { SignIn } from "./pages/SignIn";
import { Route, Switch, useHistory } from "react-router";
import { Company } from "./pages/Company";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/modules/user/user";
import { selectIsUserLoaded, selectUser } from "./store/modules/user/selectors";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isUserLoaded = useSelector(selectIsUserLoaded);
  const history = useHistory();

  React.useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  React.useEffect(() => {
    if (user && user.companyId) {
      history.push(`/${user.companyId}`);
    }
  }, [user, history]);

  if (!isUserLoaded) return <CircularProgress disableShrink />;

  return (
    <div>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/get-started" component={GetStarted} />
        <Route path="/:teamId" component={Company} />
      </Switch>
    </div>
  );
}

export default App;
