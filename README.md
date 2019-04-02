[![Coverage Status](https://coveralls.io/repos/github/mwaz/fintech-api/badge.svg?branch=master)](https://coveralls.io/github/mwaz/fintech-api?branch=master)

## Fintech 

![fin](https://user-images.githubusercontent.com/10160787/55380811-0311db00-552a-11e9-9f51-f1f474fb0574.png)

A CRUD API app built on node, express, mongodb and Passport.


The Express JS framework handles the API CRUD, mongodb handles the DB storage while Moongoose is used as an Object Document Mapper (similar to an ORM in python). PassportJs handles authenitcation of users to the application using jwt helper library.

## Requirements

* NodeJS
* Mongo DB
* express framework
* Moongoose 
* Passport

## What the app does

The API enables a user to carry out fintech transactions including calculation of interests, tax, discounts with logs of the transactions, time periods and computation times. 

## Application setup 

The API is hosted on heroku and you can access the [documentation here](https://fintech-app-api.herokuapp.com/api-docs). Through the docs you can test out the endpoints and the functionnality of the API.

## Running the application locally 
1. clone the application from `git@github.com:mwaz/fintech-api.git`
2. Install dependencies using `npm ci` or `npm install`
3. Start the application `npm start`

## Running the test locally
1. clone the application from `git@github.com:mwaz/fintech-api.git`
2. Install dependencies using `npm ci` or `npm install`
3. run the tests using `npm test`

## Technologies
Technologies used in the application are Express, Node and MongoDB. 

## Documentation 
The app is currently documented using swagger 2.0 and the Open API Specification as shown below . 

[Screenshot here]

## contributors
[@mwaz](https://github.com/mwaz)


