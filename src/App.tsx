import React from "react";
import { GetStarted } from "./pages/GetStarted";
import { SignIn } from "./pages/SignIn";
import { Route, Switch } from "react-router";
import { Company } from "./pages/Company";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/modules/user/user";
import { selectIsUserLoaded } from "./store/modules/user/selectors";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const isUserLoaded = useSelector(selectIsUserLoaded);

  if (!isUserLoaded) return <CircularProgress disableShrink />;

  return (
    <div>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/get-started" component={GetStarted} />
        <Route path="/" component={Company} />
      </Switch>
    </div>
  );
}

export default App;
