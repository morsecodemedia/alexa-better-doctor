'use strict';
const https = require('https');
/**
 * This is a small wrapper client for the BetterDoctor API.
 */
class BetterDoctorClient {

	const betterDoctorAPIEndpoint = 'https://api.betterdoctor.com/2016-03-01/';
	const betterDoctorAPIKey = '';

	getDoctors(deviceLocation, userLocation, radius) {
		betterDoctorAPIEndpoint+'doctors?location='+encodeURI(deviceLocation)+'%2C'+radius+'&user_location'+encodeURI(userLocation)+'skip=0&limit=10&user_key='+betterDoctorAPIKey;
	}

}

module.exports = BetterDoctorClient;