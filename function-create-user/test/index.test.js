'use strict';

const expect = require('chai').expect;
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const handler = require('./../index').handler;

const event = {
	"body": JSON.stringify({
		"name": "John",
		"username": "johndoe",
		"password": "johnpassword",
		"repeatPassword": "johnpassword"
	})
};

describe('User module', () => {
	describe('"create"', () => {
		it('Should create an user', (done) => {
			try {
				handler(event, {
					succeed: (json) => {
						console.log(json);
						expect(json.statusCode).to.be.equal(200);
					}
				}).then(() => {done()}).catch(err => done(err));
			} catch (err) {
				done(err);
			}
		})
	})
})
