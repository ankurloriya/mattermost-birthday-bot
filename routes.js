'use strict';
const BDayService = require("./bday")("./birthday-database.json");
module.exports = function (app, express) {
	app.get("/bdaybot", (req, res, next) => {
		console.log(req.params.name);
		//res.send(BDayService.getBDateByName(req.params.name));
	});
	// 404 page render handler
	app.use(function (req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});
	// Error handler function for development environment
	if (app.get('env') === 'development') {
		app.use(function (err, req, res) {
			res.status(err.status || 500);
		});
	}
	// production error handler
	// no stacktraces leaked to user
	app.use(function (err, req, res) {
		res.status(err.status || 500);
	});
}; //Module exports function over
