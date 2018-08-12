const async = require('asyncawait/async');
const await = require('asyncawait/await');
const UserDAO = require('./dao/user-dao').UserDAO;

let toResponse = function(code, message){
	return {
		"statusCode": code,
		"headers": {
			"Content-Type": "application/json"
		},
		"body": JSON.stringify({
			code: code,
			message: message
		})
	};
};

exports.handler = async((event, context, callback) => {
	let output = {};
	let userDao = new UserDAO();
	// TODO: Securize with authorizer
	try {
		const params = (event.queryStringParameters) ? event.queryStringParameters : {};
		if (params.username) {
			let user = await (userDao.getUser(params.username));
			if (user) {
				delete user.password;
				output = toResponse(200, user);
			}
			else 
				output = toResponse(404, "Not Found");
		} 
		else 
			throw new Error('No username to search');
	} catch(err) {
		output = toResponse(500, err.message);
	} finally {
		context.succeed(output);
	}
});
