import gql from "graphql-tag";

export default {

  FETCH_PRODUCTS: gql`
    query FetchProducts {
    products {
      _id
      name
      cost
    }
  }
  `,
  // it's this simple to query our cache!
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,


};
  

  