const async = require('asyncawait/async');
const await = require('asyncawait/await');
const UserDAO = require('./dao/user-dao').UserDAO;
const schema = require('./schema.json');
const validate = require('jsonschema').validate;
const bcrypt = require('bcrypt');

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

let ERRORS = {
	"NOT_MATCH": new Error("Passwords doesn't match")
}

exports.handler = async((event, context, callback) => {
	let output = {};
	let userDao = new UserDAO();
	try {
		let body = JSON.parse(event.body);
		let validation = validate(body, schema);
		if (validation.errors && validation.errors.length === 0) {
			if (body.password != body.repeatPassword) {
				throw ERRORS.NOT_MATCH;
			}
			delete body.repeatPassword;
			body.password = bcrypt.hashSync(body.password, 10);
			body.role = "user";
			body.settings = {};
			body.created_at = (new Date()).toISOString();
			body.updated_at = (new Date()).toISOString();
			let result = await (userDao.createUser(body));
			output = toResponse(200, "OK");
		}  else {
			let error = "";
			validation.errors.forEach((err) => {
				if (error != "") { error += ", "; }
				error += err;
			});
			output = toResponse(500, error);
		}
	} catch(err) {
		output = toResponse(500, err.message);
	} finally {
		context.succeed(output);
	}
});
