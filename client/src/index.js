import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
// import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import Mutations from "./graphql/mutations";


const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql"
});
// make sure we log any additional errors we receive
const { VERIFY_USER } = Mutations;
// if we have a token we want to verify the user is actually logged in
const token = localStorage.getItem("auth-token");

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

  const client = new ApolloClient({
    link: httpLink,
    cache,
    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    }
  });





// to avoid components async problems where
// a component would try to read the cache's value of isLoggedIn
// before our mutation goes through we can set it up here
cache.writeData({
  data: {
    isLoggedIn: Boolean(token)
  }
});


// then if we do have a token we'll go through with our mutation
if (token) {
  client
    // use the VERIFY_USER mutation directly use the returned data to know if the returned
    // user is loggedIn
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn
        }
      });
    });
}






  const Root = () => {
    return (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
  };

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
