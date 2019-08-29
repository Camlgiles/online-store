import React from 'react';
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { FETCH_PRODUCTS } = Queries;
// import { FETCH_PRODUCTS } from "../../graphql/queries";

const ProductsIndex = () => {
  return (
    <Query query={FETCH_PRODUCTS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <ul>
            {data.products.map(product => (
              <div>
                <li key={product._id}>{product.name}</li>
                <ul>
                  <li>${product.cost}.00</li>
                </ul>
              </div>
            ))}
          </ul>
        );
      }}
    </Query>
  );
}

export default ProductsIndex;