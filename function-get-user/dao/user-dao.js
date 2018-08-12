const async = require('asyncawait/async');
const await = require('asyncawait/await');

const dbConnection = require('accounting-config').dbConnection;

module.exports.UserDAO = function () {
	let modelName = "User";
	this.getUser = async( function(username) {
		const connection = await(dbConnection.connection());
		const collection = connection.collection(modelName);
		return await (collection.findOne({username: username}));
	});
}
