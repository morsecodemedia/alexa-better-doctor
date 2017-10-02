# BetterDoctor
An Alexa skill that is utilizing the BetterDoctor API to provide users search results on doctors, practices and insurances accepted in their area.

## Repository Documentation
Once you clone down the repository, you will need to run `npm install` to get the required packages.
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