'use strict';
(async function () {
	try {
		const path = require("path");
		const express = require("express");
		//Express application
		const app = express();
		//Load config
		const fs = require("fs");
		const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
		//Setup application level data
		app.set("env", config.environment);
		//Logging each request
		const morgan = require("morgan");
		//Logs every upcoming HTTP request
		app.use(morgan(':method :url [:status]'));
		//Logger bind with request
		//app.set("logger", logger);
		//Stactic file content delivery
		app.use(express.static(path.join(__dirname, 'public')));
		//Cookie parse and set in request.cookie
		const cookieParser = require('cookie-parser');
		app.use(cookieParser());
		// Gzip compression for better perfomance
		const compression = require('compression');
		app.use(compression());
		//Register all routes
		require("./routes")(app, express);
		//About server logs
		//logger.seperator("Starting Server");
		app.listen(config.http.port, () => {
			console.log("server start listening (port:" + config.http.port + ")");
		});
	} catch (err) {
		console.log("Error while starting application.");
		console.error(err);
	}
})();
