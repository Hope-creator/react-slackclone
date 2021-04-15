import React from "react";
import { GetStarted } from "./pages/GetStarted";
import { SignIn } from "./pages/SignIn";
import { Route, Switch } from "react-router";
import { Company } from "./pages/Company";

function App() {
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
