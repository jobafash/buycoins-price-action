var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const node_fetch_1 = __importDefault(require('node-fetch'));
//MAKE CALL TO COIN DESK API END POINT
async function retrieveBTCPrice() {
  const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
  try {
    const response = await node_fetch_1.default(url).then(data => data.json());
    const USDPriceObject = response['bpi']['USD'];
    return Number(USDPriceObject['rate_float']);
  } catch (error) {
    return error;
  }
}
exports.default = retrieveBTCPrice;