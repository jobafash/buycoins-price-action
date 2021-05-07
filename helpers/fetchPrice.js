const node_fetch = require('node-fetch');
//MAKE CALL TO COIN DESK API END POINT
const retrieveBTCPrice = async () => {
  const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
  try {
    const response = await node_fetch(url).then(data => data.json());
    const USDPriceObject = response['bpi']['USD'];
    return Number(USDPriceObject['rate_float']);
  } catch (error) {
    return error;
  }
}
module.exports = retrieveBTCPrice;