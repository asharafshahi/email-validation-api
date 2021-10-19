/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const app = require('../../../index');

describe('Email Check API', async () => {
  describe('POST /v1/check', () => {
    it('should detect misspellings', () => {
      return request(app)
        .post('/v1/check')
        .send({ email: 'test@gmails.com' })
        .expect(httpStatus.OK)
        .then((res) => {
          const { misspelled, autocorrect, temp } = res.body;
          expect(misspelled).to.equal(true);
          expect(autocorrect).to.equal('test@gmail.com');
          expect(temp).to.equal(false);
        });
    });
    it('should detect temporary emails', () => {
      return request(app)
        .post('/v1/check')
        .send({ email: 'defewa9830@specialistblog.com' })
        .expect(httpStatus.OK)
        .then((res) => {
          const { temp, invalid } = res.body;
          expect(temp).to.equal(true);
          expect(invalid).to.equal(false);
        });
    });
    it('should detect invalid emails by MX record', () => {
      return request(app)
        .post('/v1/check')
        .send({ email: 'asdfasdfasf@adsfasdgasgw.com' })
        .expect(httpStatus.OK)
        .then((res) => {
          const { invalid } = res.body;
          expect(invalid).to.equal(true);
        });
    });
  });
});
