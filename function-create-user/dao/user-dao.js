const async = require('asyncawait/async');
const await = require('asyncawait/await');

const config = require('accounting-config').config;
const dbConnection = require('accounting-config').dbConnection;

module.exports.UserDAO = function () {
	let modelName = "User";
	this.createUser = async( function(user) {
		const connection = await(dbConnection.connection());
		const collection = connection.collection(modelName);
		let result = await (collection.insert(user));
		await( collection.createIndex({ "name": 1, "username": 1 }) )
		return result;
	});
}
