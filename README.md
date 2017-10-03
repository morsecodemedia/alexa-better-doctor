# BetterDoctor
An Alexa skill that is utilizing the BetterDoctor API to provide users search results on doctors, practices and insurances accepted in their area.

## Repository Documentation
Once you clone down the repository, you will need to run `npm install` to get the required packages.

### App IDs and API Keys
You will need to set a few keys and IDs for this all to work.
#### Alexa App ID
In `/src/index.js` look for the following line and add your app id.

	const APP_ID = ""; // This value would be your Skill ID. You can find this on https://developer.amazon.com/

#### Google Maps API Key
In `/src/Handlers.js` look for the following line and add your api key.

	const googleMapsApiKey = ""; // This value would be your Google Maps API Key. You can get one at https://console.developers.google.com

#### BetterDoctor API Key
In `/src/?.js` look for the following line and add your api key.
	const betterDoctorApiKey = ""; // This value would be your BetterDoctor API Key. You can get one at https://developer.betterdoctor.com

### Intents & Slots
The intent schema JSON file is found in `/speachAssets`.

### Lambda functionality
All functionality that gets uploaded to Lambda is found in `/src`.
To package up the source files for upload to Lambda, go to the root directory of the project and run the following:

	zip -r packagedSource.zip *

## API Documentation
https://betterdoctor.com/developers/

## Alexa Skill Documentation
This skill requires you to allow permissions to get your device's location. This is because this skill will find doctors/practices based on your location.
### Intents
	//TODO
### Slots
	//TODO