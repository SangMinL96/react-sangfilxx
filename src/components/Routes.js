import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import TV from "../TV/TV";
import Search from "../Search/Search";
import MovieDetail from "../Datail/MovieDetail";
import Header from "./Header";
import TVDetail from "../Datail/TVDetail";

function Routes() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/react-sangfilxx" exact component={Home} />
          <Route path="/TV" component={TV} />
          <Route path="/Search" component={Search} />
          <Route path="/MovieDetail/:id" component={MovieDetail} />
          <Route path="/TVDetail/:id" component={TVDetail} />
        </Switch>
      </Router>
    </>
  );
}
export default Routes;
