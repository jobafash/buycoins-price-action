var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const graphql_1 = require('graphql');
const utils_1 = require('./utils');
const fetch_price_1 = __importDefault(require('./helper/fetch-price'));
const CalculatePriceObjectType = new graphql_1.GraphQLObjectType({
  name: 'CalculatePriceObjectType',
  fields: {
    exchangeType: { type: graphql_1.GraphQLString },
    margin: { type: graphql_1.GraphQLInt },
    exchangeRate: { type: graphql_1.GraphQLFloat },
    calculatedPrice: {
      type: graphql_1.GraphQLString,
      resolve(parent, _args) {
        return parent;
      },
    },
  },
});
const RootQuery = new graphql_1.GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    calculatePrice: {
      description: `THIS FIELD DOES THE ACTUAL CALCULATION BASED ON ARGS`,
      type: CalculatePriceObjectType,
      args: {
        exchangeType: { type: graphql_1.GraphQLString },
        margin: { type: graphql_1.GraphQLFloat },
        exchangeRate: { type: graphql_1.GraphQLInt },
      },
      async resolve(_parent, args) {
        const { error, value } = utils_1.doValidation(Object.assign({}, args));
        if (error) {
          return error;
        }
        const currentPrice = await fetch_price_1.default();
        const computedMargin =
          value.exchangeType === 'BUY'
            ? currentPrice + currentPrice * (value.margin / 100)
            : currentPrice - currentPrice * (value.margin / 100);
        let d = `NGN ${computedMargin * value.exchangeRate}`;
        return d;
      },
    },
  },
});
exports.default = new graphql_1.GraphQLSchema({
  query: RootQuery,
});