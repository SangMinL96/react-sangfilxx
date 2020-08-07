import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import Tv from "../Routes/Tv";
import Search from "../Routes/Search";
import Detail from "../Routes/Detail";
import Header from "./Header";

function Routes() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Tv" component={Tv} />
          <Route path="/Search" component={Search} />
          <Route path="/Detail/:id" component={Detail} />
        </Switch>
      </Router>
    </>
  );
}
export default Routes;
