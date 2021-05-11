const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const app = require('../index').app;
const request = require("supertest")(app);

describe('On passing the right input formats to buy', () => {
  it('should return the computed result',  (done) => {
    request
    .post("/graphiql")
    .send({
      query:
        '{calculatePrice(type: "buy", margin: 0.2, exchangeRate: 472) { price } }'
    })
    .expect(200)
    .end((err, res) => {
      // res will contain array with one user
      if (err) return done(err);
      res.body.data.calculatePrice.should.have.property("price");
      done();
      });
  });
});
describe('On passing the right input formats to sell', () => {
  it('should return the computed result',  (done) => {
     request
      .post("/graphiql")
      .send({
        query:
          '{calculatePrice(type: "sell", margin: 0.2, exchangeRate: 485) { price } }'
      })
      .expect(200)
      .end((err, res) => {
        // res will contain array with one user
        if (err) return done(err);

        res.body.data.calculatePrice.should.have.property("price");
        done();
      });
  });
});
describe('On passing wrong input formats', () => {
  it('should return null',  (done) => {
     request
      .post("/graphiql")
      .send({
        query:
          '{calculatePrice(type: "buys", margin: 0.2, exchangeRate: 502) { price } }'
      })
      .expect(200)
      .end((err, res) => {
        // res will contain array with one user
        if (err) return done(err);

        res.body.data.should.have.property("calculatePrice");
        expect(res.body.data.calculatePrice) == null;
        done();
      });
  });
});