const graphql = require('graphql');
const utils = require('./utils');
const fetch_price = require('../helpers/fetchPrice');
const CalculatePriceObjectType = new graphql.GraphQLObjectType({
  name: 'CalculatePriceObjectType',
  fields: {
    type: { type: graphql.GraphQLString },
    margin: { type: graphql.GraphQLInt },
    exchangeRate: { type: graphql.GraphQLFloat },
    price: {
      type: graphql.GraphQLString,
      resolve(parent, _args) {
        return parent;
      },
    },
  },
});
const RootQuery = new graphql.GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    calculatePrice: {
      description: `THIS FIELD DOES THE ACTUAL CALCULATION BASED ON ARGS`,
      type: CalculatePriceObjectType,
      args: {
        type: { type: graphql.GraphQLString },
        margin: { type: graphql.GraphQLFloat },
        exchangeRate: { type: graphql.GraphQLInt },
      },
      async resolve(_parent, args) {
        const { error, value } = utils.doValidation(Object.assign({}, args));
        if (error) {
          return error;
        }
        const currentPrice = await fetch_price();
        const computedMargin =
          value.type === 'BUY'
            ? currentPrice + currentPrice * (value.margin / 100)
            : currentPrice - currentPrice * (value.margin / 100);
        let d = `NGN ${computedMargin * value.exchangeRate}`;
        return d;
      },
    },
  },
});
module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});