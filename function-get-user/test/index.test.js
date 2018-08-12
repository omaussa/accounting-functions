'use strict';

const expect = require('chai').expect;
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const handler = require('./../index').handler;

const dbConnection = require('accounting-config').dbConnection;

let insert = async(function () {
	let user = {
		"name": "John Doe",
		"username": "johndoe",
		"password": "johnpassword",
		"repeatPassword": "johnpassword"
	};
	let modelName = "User";
	const connection = await(dbConnection.connection());
	const collection = connection.collection(modelName);
	await (collection.insert(user));
})

const eventWithUser = {
	"queryStringParameters": {
		"username": "johndoe"
	}
};

const event500 = {
	"queryStringParameters": {
	}
};

describe('User module', () => {
	describe('"get"', () => {
		it('Should get an 404', (done) => {
			try {
				handler(eventWithUser, {
					succeed: (json) => {
						console.log(json);
						expect(json.statusCode).to.be.equal(404);
					}
				}).then(() => {done()}).catch(err => done(err));
			} catch (err) {
				done(err);
			}
		})
		it('Should get an user', (done) => {
			try {
				insert().then(() => {
					handler(eventWithUser, {
						succeed: (json) => {
							console.log(json);
							expect(json.statusCode).to.be.equal(200);
						}
					}).then(() => {done()}).catch(err => done(err));
				}).catch(err => done(err));
			} catch (err) {
				done(err);
			}
		})
		it('Should get an 500', (done) => {
			try {
				handler(event500, {
					succeed: (json) => {
						console.log(json);
						expect(json.statusCode).to.be.equal(500);
					}
				}).then(() => {done()}).catch(err => done(err));
			} catch (err) {
				done(err);
			}
		})
	})
})
