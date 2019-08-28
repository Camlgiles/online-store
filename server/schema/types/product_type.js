const mongoose = require("mongoose");
const graphql = require("graphql");
const category_type  = require("./category_type")
const Product = require('../../models/Product');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    // category: { 
      // type: category_type,
      // resolver(parent) {
      //   Product.findById(parent._id)
      //   .populate("category").then(prod => prod.category)
      // }
    //  },
    description: { type: GraphQLString },
    weight: { type: GraphQLInt }
  })
})
 
module.exports = ProductType;