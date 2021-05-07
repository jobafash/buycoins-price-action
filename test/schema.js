const axios = require('axios');

describe('On passing the right input formats to buy', () => {
  test('should return the computed result', async () => {
    const response = await axios.post('http://localhost:3001/graphql', {
      query: `query{
				calculatePrice(exchangeType: "buy", margin: 0.1, exchangeRate: 450){
          calculatedPrice
				}
			}`,
    });
    const { data } = response;
    console.log(data);
    expect(data.data).toHaveProperty('calculatePrice');
    expect(data.data.calculatePrice).toBeDefined();
  });
});
describe('On passing the right input formats to sell', () => {
  test('should return the computed result', async () => {
    const response = await axios.post('http://localhost:3001/graphql', {
      query: `query{
				calculatePrice(exchangeType: "sell", margin: 0.2, exchangeRate: 450){
          calculatedPrice
				}
			}`,
    });
    const { data } = response;
    console.log(data);
    expect(data.data).toHaveProperty('calculatePrice');
    expect(data.data.calculatePrice).toBeDefined();
  });
});
describe('On passing wrong input formats', () => {
  test('should return an null', async () => {
    const response = await axios.post('http://localhost:3001/graphql', {
      query: `query{
				calculatePrice(exchangeType: "buys", margin: 0.2, exchangeRate: 360){
					calculatedPrice
				}
			}`,
    });
    const { data } = response;
    console.log(data);
    expect(data.data).toHaveProperty('calculatePrice');
    expect(data.data.calculatePrice).toBe(null);
  });
});