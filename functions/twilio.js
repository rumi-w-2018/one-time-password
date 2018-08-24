// Text to user
const twilio = require('twilio');
const twilioConfig = require('./config/twilio-config');

const accountSid = twilioConfig.accountSid;
const authToken= twilioConfig.authToken;

module.exports = new twilio.Twilio(accountSid, authToken);