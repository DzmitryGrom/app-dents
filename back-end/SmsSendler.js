const TeleSignSDK = require('telesignsdk');
const dayJs = require('dayjs');
const customerId = "C1180864-5141-4655-8DCF-C141C2404E7A";
const apiKey = "C/bj8X/G2yqmp8z8eWZCmCqXhBYIYZaWRphg7r4LSKQ+p6ZaOl/Z4HgXGTJAAbu/OGBR6zGIdJ8d/RdqTJNyEA==";
const rest_endpoint = "https://rest-api.telesign.com";
const phoneNumber = "+375295343820";
const messageType = "ARN";
// ToDo setup delay sending sms
function messageCallback(error, responseBody) {
    if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${responseBody['status']['code']}` +
            `, description: ${responseBody['status']['description']}`);
    } else {
        console.error("Unable to send message. " + error);
    }
}
const SmsSendlerndSms = async function ({
    time,
    date
}) {

    const client = new TeleSignSDK(customerId,
        apiKey,
        rest_endpoint,
    );
    const message = `You're scheduled for a dentist appointment ${date} at ${time}.`;
    //await client.sms.message(messageCallback, phoneNumber, message, messageType);
    return "SMS_WAS_NOT_SEND";
}

module.exports = SmsSendlerndSms;