import React from "react";
import Nav from "./Nav";
import IconButton from "./IconButton";
import HomeScreen from "./Home";
import Create from "./Create";
import CreateCosts from "./Create/Costs";
import { ProviderApp } from "../context/AppContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Main() {
  return (
    <div className="App">
      <Router>
        <ProviderApp>
          <Nav />
          <div className="screen">
            <div className="screen__leftbar">
              <IconButton image="/icons/dashboard.svg" />
              <IconButton image="/icons/payment.svg" />
              <IconButton image="/icons/mail.svg" />
              <IconButton image="/icons/Group 783.svg" />
              <IconButton image="/icons/support.svg" />
            </div>
            <Switch>
              <Route exact path="/">
                <HomeScreen />
              </Route>
              <Route path="/create-plan">
                <Create />
              </Route>
              <Route path="/create-costs">
                <CreateCosts />
              </Route>
            </Switch>
          </div>
        </ProviderApp>
      </Router>
    </div>
  );
}
