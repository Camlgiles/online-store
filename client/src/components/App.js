import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ProductIndex from "./products/ProductsIndex";
import Login from "./Login"
import {Route, HashRouter, Switch} from "react-router-dom";
import AuthRoute from '../util/route_util';
import Nav from './Nav';


const App = () => {
  return (
    <div>
      <h1>Online Store</h1>
    <HashRouter>
        <Route path="/" component={Nav} />
    <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <Route path="/" component={ProductIndex} />
      </Switch>
    </HashRouter>
 

    </div>
  );
};

export default App;
