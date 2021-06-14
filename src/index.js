'use strict';

// Configurations
const alexaSkillID 		= '';
const googleMapsAPIKey 	= '';
const alexaSDK 			= require('alexa-sdk');
const $q        		= require('q');

const googleMapsClient 	= require('@google/maps').createClient({
	Promise: $q.Promise,
	key: googleMapsAPIKey
})

// Another Possible value if you only want permissions for the country and postal code is: read::alexa:device:all:address:country_and_postal_code
// Be sure to check your permissions settings for your skill on https://developer.amazon.com/
const addressPermissions = 'read::alexa:device:all:address'
const permissions = [addressPermissions]

// Local imports
const Handlers = require('./Handlers');

exports.handler = function (event, context, callback) {
	let alexa = alexaSDK.handler(event, context)

    alexa.skillID = alexaSkillID
    alexa.registerHandlers(Handlers)

    console.log(`Beginning execution for skill with skillID=${alexa.skillID}`)
    alexa.execute()
    console.log(`Ending execution for skill with skillID=${alexa.skillID}`)
}