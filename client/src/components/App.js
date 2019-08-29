import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ProductIndex from "./products/ProductsIndex";
import {Route, HashRouter} from "react-router-dom";



const App = () => {
  return (
    <div>
      <h1>Online Store</h1>
    <HashRouter>
     <Route exact path="/" component={ProductIndex} />
    </HashRouter>
 

    </div>
  );
};

export default App;
