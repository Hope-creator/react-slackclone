import React from "react";
import { GetStarted } from "./pages/GetStarted";
import { SignIn } from "./pages/SignIn";
import { Route, Switch } from "react-router";
import { Company } from "./pages/Company";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/modules/user/user";

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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
