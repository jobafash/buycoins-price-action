const chai = require("chai");
const expect = chai.expect;

require('dotenv').config();

const appPort = process.env.PORT || 3000;
const url = `http://localhost:${appPort}`;
const request = require("supertest")(url);

describe('On passing the right input formats to buy', () => {
  it('should return the computed result', async (done) => {
    await request
    .post("/graphql")
    .send({
      query:
        '{calculatePrice(type: "buy", margin: 0.2, exchangeRate: 472) { price currency type } }'
    })
    .expect(200)
    .end((err, res) => {
      // res will contain array with one user
      if (err) return done(err);
      expect(res.body.data.calculatePrice).to.have.property("price");
      expect(res.body.data.calculatePrice).to.have.property("currency");
      expect(res.body.data.calculatePrice).to.have.property("type");
      done();
      });
  });
});
describe('On passing the right input formats to sell', () => {
  it('should return the computed result', async (done) => {
    await request
      .post("/graphql")
      .send({
        query:
          '{calculatePrice(type: "sell", margin: 0.2, exchangeRate: 472) { price currency type } }'
      })
      .expect(200)
      .end((err, res) => {
        // res will contain array with one user
        if (err) return done(err);

        expect(res.body.data.calculatePrice).to.have.property("price");
        expect(res.body.data.calculatePrice).to.have.property("currency");
        expect(res.body.data.calculatePrice).to.have.property("type");
        done();
      });
  });
});
describe('On passing wrong input formats', () => {
  it('should return null', async (done) => {
    await request
      .post("/graphql")
      .send({
        query:
          '{calculatePrice(type: "buys", margin: 0.2, exchangeRate: 472) { price currency type } }'
      })
      .expect(200)
      .end((err, res) => {
        // res will contain array with one user
        if (err) return done(err);

        expect(res.body.data).to.have.property("calculatePrice");
        expect(res.body.data.calculatePrice).to.be(null);
        done();
      });
  });
});