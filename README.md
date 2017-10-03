# BetterDoctor
An Alexa skill that is utilizing the BetterDoctor API to provide users search results on doctors, practices and insurances accepted in their area.

## Alexa Skill Documentation
This skill requires you to allow permissions to get your device's location. This is because this skill will find doctors/practices based on your location.
### Intents
	//TODO
### Slots
	//TODO

## Developer Documentation
Once you clone down the repository, you will need to run `npm install` to get the required packages.

### App IDs and API Keys
 While the main functionality is to request information from the BetterDoctor API, there are few additional API calls we need to make behind the scenes to get the information needed for the BetterDoctor API to give us a proper response. You will need to set a few keys and IDs for this all to work.
#### Alexa Skill ID
You will need to get your Skill ID and add it to the file outlined below. The reason for this, is that the skill requires the user to grant permissions to get the location of the Alexa enabled device. Since at the time of development, geolocation is not an option for Alexa devices, the location is "hardcoded" to the device itself. That is the address the skill will be looking for.

In [/src/index.js](https://github.com/morsecodemedia/better-doctor/blob/master/src/index.js) look for the following line and add your skill id.

	const APP_ID = ""; // This value would be your Skill ID. You can find this on https://developer.amazon.com/

#### Google Maps API Key
You will also need to get a Google Maps API key. Unfortunately, at this time, the BetterDoctor API requires latitude/longitude coordinates for its searches. So the skill will take the address provided from the Alexa device and geocode it before making a request to the BetterDoctor API.

In [/src/Handlers.js](https://github.com/morsecodemedia/better-doctor/blob/master/src/Handlers.js) look for the following line and add your api key.

	const googleMapsApiKey = ""; // This value would be your Google Maps API Key. You can get one at https://console.developers.google.com

#### BetterDoctor API Key
In `/src/?.js` look for the following line and add your api key.

	const betterDoctorApiKey = ""; // This value would be your BetterDoctor API Key. You can get one at https://developer.betterdoctor.com

### Intents & Slots
The intent schema JSON file is found in [/speachAssets](https://github.com/morsecodemedia/better-doctor/tree/master/speechAssets).

### Lambda functionality
All functionality that gets uploaded to Lambda is found in [/src](https://github.com/morsecodemedia/better-doctor/tree/master/src).
To package up the source files for upload to Lambda, go to the root directory of the project and run the following:

	zip -r packagedSource.zip *

### API Documentations
#### Google Maps
https://github.com/googlemaps/google-maps-services-js
#### BetterDoctor
https://betterdoctor.com/developers/