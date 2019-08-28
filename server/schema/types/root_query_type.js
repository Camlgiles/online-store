const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const axios = require("axios");
const AWSKey = require("../../../config/keys.js").AWSKey;
const Product = mongoose.model("products");
const UserType = require("./user_type");
const ProductType = require("./product_type");
const User = mongoose.model("users");

const authOptions = {
  method: "GET",
  url:
    "https://254pggbkm4.execute-api.us-east-2.amazonaws.com/default/generate-price",
  headers: {
    "x-api-key": AWSKey
  }
};

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    product: {
      type: ProductType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        // find our product
        return Product.findById(args._id).then(product => {
          // then fetch our price using the above options
          return axios(authOptions).then(res => {
            // set our cost onto the Product Object
            product.cost = res.data.cost;
            // then return the complete product object
            return product;
          });
        });
      }
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve () {
        return Product.find({}).then(products => {
          const productsMapped = products.map(product => {
            return axios(authOptions).then(res => {
            // set our cost onto the Product Object
            product.cost = res.data.cost;
            // then return the complete product object
            return product;
          })
        }
        )
        return productsMapped;
      }
    )}
  }
})
});

module.exports = RootQueryType;