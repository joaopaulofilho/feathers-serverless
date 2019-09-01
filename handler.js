const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const serverless = require('serverless-http');

const Messages = require('services/messages.class');

// This creates an app that is both, an Express and Feathers app
const app = express(feathers());

// Turn on JSON body parsing for REST services
app.use(express.json());
// Turn on URL-encoded body parsing for REST services
app.use(express.urlencoded({ extended: true }));
// Set up REST transport using Express
app.configure(express.rest());

// Set up an error handler that gives us nicer errors
app.use(express.errorHandler());

// Initialize the messages service by creating
// a new instance of our class
app.use('messages', new Messages());

// Export the wrapped application as the 'handler' method
module.exports.messages = serverless(app);