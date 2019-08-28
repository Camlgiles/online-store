const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");
const CategoryType = require("./types/category_type");
const ProductType = require("./types/product_type");
const Category = mongoose.model("categories");
const Product = mongoose.model("products");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newCategory : {
        type: CategoryType ,
        args: {
          name: { type: GraphQLString }
        },
        resolve(p, { name }) {
          return new Category({ name }).save();
        }
    },
    deleteCategory : {
        type: CategoryType ,
        args: {
          id: { type: GraphQLID }
        },
        resolve(p, {id}) {
          return Category.remove({id});
        }
    },
    newProduct : {
        type: ProductType ,
        args: {
            name: { type: GraphQLString },
            description: { type: GraphQLString }
        },
        resolve(p, {name, description}) {
            return new Product({name, description}).save();
        }
    },
    deleteProduct : {
      type: ProductType ,
      args: {id: {type: GraphQLID}},
      resolve(p, {id}) {
        return Product.remove({id});
      }
    },

    // updateProductCategory: {

    // }

  }
});

module.exports = mutation;