'use strict';

/**
 * This class contains all handler function definitions
 * for the various events that we will be registering for.
 * For an understanding of how these Alexa Skill event objects
 * are structured refer to the following documentation:
 * https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interface-reference
 */

// Internal imports
const AlexaDeviceAddressClient = require('./AlexaDeviceAddressClient');
const Intents = require('./Intents');
const Events = require('./Events');
const Messages = require('./Messages');


/**
 * Another Possible value if you only want permissions for the country and postal code is:
 * read::alexa:device:all:address:country_and_postal_code
 * Be sure to check your permissions settings for your skill on https://developer.amazon.com/
 */
const ALL_ADDRESS_PERMISSION = "read::alexa:device:all:address";

const PERMISSIONS = [ALL_ADDRESS_PERMISSION];

/**
 * This is the handler for the NewSession event.
 * Refer to the  Events.js file for more documentation.
 */
const newSessionRequestHandler = function() {
    console.info("Starting newSessionRequestHandler()");

    if(this.event.request.type === Events.LAUNCH_REQUEST) {
        this.emit(Events.LAUNCH_REQUEST);
    } else if (this.event.request.type === "IntentRequest") {
        this.emit(this.event.request.intent.name);
    }

    console.info("Ending newSessionRequestHandler()");
};

/**
 * This is the handler for the LaunchRequest event. Refer to
 * the Events.js file for more documentation.
 */
const launchRequestHandler = function() {
    console.info("Starting launchRequestHandler()");
    this.emit(":ask", Messages.WELCOME + Messages.WHAT_DO_YOU_WANT, Messages.WHAT_DO_YOU_WANT);
    console.info("Ending launchRequestHandler()");
};

/**
 * This is the handler for our custom GetAddress intent.
 * Refer to the Intents.js file for documentation.
 */
const getAddressHandler = function() {
    console.info("Starting getAddressHandler()");

    const consentToken = this.event.context.System.user.permissions.consentToken;

    // If we have not been provided with a consent token, this means that the user has not
    // authorized your skill to access this information. In this case, you should prompt them
    // that you don't have permissions to retrieve their address.
    if(!consentToken) {
        this.emit(":tellWithPermissionCard", Messages.NOTIFY_MISSING_PERMISSIONS, PERMISSIONS);

        // Lets terminate early since we can't do anything else.
        console.log("User did not give us permissions to access their address.");
        console.info("Ending getAddressHandler()");
        return;
    }

    const deviceId = this.event.context.System.device.deviceId;
    const apiEndpoint = this.event.context.System.apiEndpoint;

    const alexaDeviceAddressClient = new AlexaDeviceAddressClient(apiEndpoint, deviceId, consentToken);
    let deviceAddressRequest = alexaDeviceAddressClient.getFullAddress();

	const googleMapsApiKey = "AIzaSyDlB1GKL6iJlYLTr6Tv7V006riuFtxNleY"; // This value would be your Google Maps API Key. You can get one at https://console.developers.google.com

    deviceAddressRequest.then((addressResponse) => {
        switch(addressResponse.statusCode) {
            case 200:
                console.log("Address successfully retrieved, now responding to user.");
                const address = addressResponse.address;
				const fullAddress = `${address['addressLine1']}, ${address['stateOrRegion']}, ${address['postalCode']}`;
				const googleMapsClient = require('@google/maps').createClient({
					key: googleMapsApiKey,
					Promise: Promise // 'Promise' is the native constructor.
				});

				console.info("Starting geocoding of device address");
				googleMapsClient.geocode({
					address: fullAddress
				}).asPromise()
				.then((response) => {
					console.log(response.json.results);
					switch(response.json.results.status) {
						case 'OK':
							console.log("Address successfully geoencoded.");
							console.log(response.json.results.geometry.location);
							return response.json.results.geometry.location;
						break;
						case 'ZERO_RESULTS':
							console.log("ZERO_RESULTS");
						break;
						case 'OVER_QUERY_LIMIT':
							console.log("OVER_QUERY_LIMIT");
						break;
						case 'REQUEST_DENIED':
							console.log("REQUEST_DENIED");
						break;
						case 'INVALID_REQUEST':
							console.log("INVALID_REQUEST");
						break;
						case 'UNKNOWN_ERROR':
							console.log("UNKNOWN_ERROR");
						break;
					}
				})
				.catch((err) => {
				  console.log(err);
				});

                const ADDRESS_MESSAGE = Messages.ADDRESS_AVAILABLE +
                    `${address['addressLine1']}, ${address['stateOrRegion']}, ${address['postalCode']}`;

                this.emit(":tell", ADDRESS_MESSAGE);
                break;
            case 204:
                // This likely means that the user didn't have their address set via the companion app.
                console.log("Successfully requested from the device address API, but no address was returned.");
                this.emit(":tell", Messages.NO_ADDRESS);
                break;
            case 403:
                console.log("The consent token we had wasn't authorized to access the user's address.");
                this.emit(":tellWithPermissionCard", Messages.NOTIFY_MISSING_PERMISSIONS, PERMISSIONS);
                break;
            default:
                this.emit(":ask", Messages.LOCATION_FAILURE, Messages.LOCATION_FAILURE);
        }

        console.info("Ending getAddressHandler()");
    });

    deviceAddressRequest.catch((error) => {
        this.emit(":tell", Messages.ERROR);
        console.error(error);
        console.info("Ending getAddressHandler()");
    });
};

/**
 * This is the handler for the SessionEnded event. Refer to
 * the Events.js file for more documentation.
 */
const sessionEndedRequestHandler = function() {
    console.info("Starting sessionEndedRequestHandler()");
    this.emit(":tell", Messages.GOODBYE);
    console.info("Ending sessionEndedRequestHandler()");
};

/**
 * This is the handler for the Unhandled event. Refer to
 * the Events.js file for more documentation.
 */
const unhandledRequestHandler = function() {
    console.info("Starting unhandledRequestHandler()");
    this.emit(":ask", Messages.UNHANDLED, Messages.UNHANDLED);
    console.info("Ending unhandledRequestHandler()");
};

/**
 * This is the handler for the Amazon help built in intent.
 * Refer to the Intents.js file for documentation.
 */
const amazonHelpHandler = function() {
    console.info("Starting amazonHelpHandler()");
    this.emit(":ask", Messages.HELP, Messages.HELP);
    console.info("Ending amazonHelpHandler()");
};

/**
 * This is the handler for the Amazon cancel built in intent.
 * Refer to the Intents.js file for documentation.
 */
const amazonCancelHandler = function() {
    console.info("Starting amazonCancelHandler()");
    this.emit(":tell", Messages.GOODBYE);
    console.info("Ending amazonCancelHandler()");
};

/**
 * This is the handler for the Amazon stop built in intent.
 * Refer to the Intents.js file for documentation.
 */
const amazonStopHandler = function() {
    console.info("Starting amazonStopHandler()");
    this.emit(":ask", Messages.STOP, Messages.STOP);
    console.info("Ending amazonStopHandler()");
};


const handlers = {};
// Add event handlers
handlers[Events.NEW_SESSION] = newSessionRequestHandler;
handlers[Events.LAUNCH_REQUEST] = launchRequestHandler;
handlers[Events.SESSION_ENDED] = sessionEndedRequestHandler;
handlers[Events.UNHANDLED] = unhandledRequestHandler;

// Add intent handlers
handlers[Intents.GET_ADDRESS] = getAddressHandler;
handlers[Intents.AMAZON_CANCEL] = amazonCancelHandler;
handlers[Intents.AMAZON_STOP] = amazonStopHandler;
handlers[Intents.AMAZON_HELP] = amazonHelpHandler;

module.exports = handlers;