'use strict';
const fs = require('fs');
module.exports = function (datasourcePath) {
	let bdayData = {};
	if (!fs.existsSync(datasourcePath)) {
		console.log("File not found creating a file.");
		fs.writeFileSync(datasourcePath, JSON.stringify(bdayData, null, 4));
		console.log("File has been created.");
	}
	try {
		bdayData = JSON.parse(fs.readFileSync(datasourcePath, 'utf-8'));
	} catch (error) {
		throw new Error("No able to read and parse the file.");
	}
	const getBDateByName = function (name) {
		if (!name || name === "") {
			return false;
		}
		return bdayData[name] || false;
	};
	const setBDateByName = function (name, day, month) {
		// TODO validation
		bdayData[name] = {
			"month": month,
			"day": day
		};
		//TODO validate writing
		writeDataToFile();
	};
	const removeName = function (name) {
		if (!name || name === "") {
			return false;
		}
		try {
			delete bdayData[name];
			writeDataToFile();
			return true;
		} catch (err) {
			return false;
		}
	};
	const monthBDate = function (month) {};
	const thisWeekBDate = function (day, month) {};
	const writeDataToFile = function () {
		try {
			fs.writeSync(datasourcePath, JSON.stringify(bdayData, null, 4));
			return true;
		} catch (error) {
			return false;
		}
	};
	return {
		getBDateByName,
		setBDateByName,
		removeName
	}
};
