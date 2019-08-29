import gql from "graphql-tag";

export default {

  FETCH_PRODUCTS: gql`
    query FetchProducts {
    products {
      _id
      name
    }
  }
  `,
  
}
  
  