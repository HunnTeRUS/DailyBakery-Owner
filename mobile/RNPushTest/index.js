/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiPushAPIGraphQLAPIIdOutput = process.env.API_PUSHAPI_GRAPHQLAPIIDOUTPUT
var apiPushAPIGraphQLAPIEndpointOutput = process.env.API_PUSHAPI_GRAPHQLAPIENDPOINTOUTPUT
var analyticsAmplifypushappId = process.env.ANALYTICS_AMPLIFYPUSHAPP_ID
var analyticsAmplifypushappRegion = process.env.ANALYTICS_AMPLIFYPUSHAPP_REGION

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1'; // fill in your right region ******
const pinpoint = new AWS.Pinpoint();

exports.handler = async (event, context) => {
  try {
    event = event.arguments.input;

    // Create a AWS Pinpoint project
    const appID = await createApp();

    // Enable the SES email address for the project
    enableChannels(appID, event.email);

    // Create the endpoints for the Pinpoint project/app
    await createEndPoints(
      appID,
      event.id,
      event.email,
      event.name,
      event.token,
    );

    // Create a segment where you want to filter the endpoint you want to send a message to
    const segmentID = await createSegment(appID);

    // create starter segment and campaign.
    const hookLambda = 'pushNotification-dev';
    const result = await createCampaign(
      appID,
      event.message,
      hookLambda,
      segmentID,
    );

    return result;
  } catch (error) {
    console.log('Oops! An error happened.');
  }
};

async function createApp() {
  let params = {
    CreateApplicationRequest: {
      /* required */
      Name: 'Daily}Bakery' /* Campaign name, required */,
    },
  };

  return new Promise((res, rej) => {
    pinpoint.createApp(params, function (err, data) {
      if (err) {
        rej(err);
        console.log(err, err.stack); // an error occurred
      } else {
        res(data.ApplicationResponse.Id); //console.log(data);// successful response
      }
    });
  });
}

/*
When you create a new pinpoint app you need to activate an emailaddress where the emails can be send from
*/
function enableChannels(appID, email) {
  console.log(appID, email);
  var params = {
    ApplicationId: appID /* required */,
    EmailChannelRequest: {
      /* required */
      FromAddress:
        '<yuri.camara15@gmail.com' /* use the emailaddress that you activated in AWS SES, required  */,
      Identity:
        'arn:aws:ses:us-east-1:746251520558:identity/' + email /* required */,
      Enabled: true,
    },
  };
  pinpoint.updateEmailChannel(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data); // successful response
  });
}

/*
An endpoint is an object which contains user data which you can use later in a segment to send messages
*/
async function createEndPoints(appID, id, email, name, token) {
  let params = {
    ApplicationId: appID /* required */,
    EndpointId: id /* required */,
    EndpointRequest: {
      /* required */
      Address: email,
      ChannelType: 'EMAIL',
      EndpointStatus: 'ACTIVE',
      OptOut: 'NONE',
      User: {
        UserAttributes: {
          name: [
            name,
            /* more items */
          ],
          expoToken: [
            token,
            /* more items */
          ],
        },
      },
    },
  };

  await pinpoint.updateEndpoint(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      // an error occurred
    } else {
      console.log(data); // successful response
    }
  });
}

function createSegment(appID) {
  let params = {
    ApplicationId: appID /* required */,
    WriteSegmentRequest: {
      /* required */
      Dimensions: {
        Demographic: {
          Channel: {
            Values: [
              /* required */
              'EMAIL',
              /* more items */
            ],
            DimensionType: 'INCLUSIVE',
          },
        },
      },
      Name: 'Segment',
    },
  };

  return new Promise((res, rej) => {
    pinpoint.createSegment(params, function (err, data) {
      if (err) {
        rej(err);
        console.log(err, err.stack); // an error occurred
      } else {
        res(data.SegmentResponse.Id); //console.log(data);// successful response
      }
    });
  });
}
/*
With the endpoint(s) created you can create a segment. A segment is a filter which selects the right endpionts to send messages to
*/
async function createCampaign(appID, message, env, segmentID) {
  const utcDate = new Date(Date.now());

  const params = {
    ApplicationId: appID /* required */,
    WriteCampaignRequest: {
      /* required */
      HoldoutPercent: 0,
      Hook: {
        LambdaFunctionName: env,
        Mode: 'FILTER',
      },
      IsPaused: false,
      Limits: {},
      MessageConfiguration: {
        EmailMessage: {
          Title: 'Test Email Message',
          HtmlBody:
            `<!DOCTYPE html>\n    <html lang="en">\n    <head>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n</head>\n<body>\n<H2>Hallo {{User.UserAttributes.name}},</H2>\n\n <br />This is a Text Message from PinPoint. \n You have send this text: \n\n` +
            message +
            `\n</body>\n</html>`,
          FromAddress: '<FROM EMAIL ADDRESS>',
        },
        DefaultMessage: {
          // you push message
          Body: message,
        },
      },
      Name: 'push campaign',
      Schedule: {
        IsLocalTime: false,
        QuietTime: {},
        StartTime: utcDate.toISOString(),
        Frequency: 'ONCE',
      },
      SegmentId: String(segmentID),
      SegmentVersion: 1,
      tags: {},
    },
  };

  return new Promise((res, rej) => {
    pinpoint.createCampaign(params, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        const response = {
          statusCode: 500,
          body: JSON.stringify(err),
        };
        rej(response);
      } else {
        console.log(data);
        const response = {
          statusCode: 200,
          body: JSON.stringify(data),
        };

        res(response); // successful response
      }
    });
  });
}

/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiPushAPIGraphQLAPIIdOutput = process.env.API_PUSHAPI_GRAPHQLAPIIDOUTPUT
var apiPushAPIGraphQLAPIEndpointOutput = process.env.API_PUSHAPI_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */ const {
  Expo,
} = require('expo-server-sdk');

// Create a new Expo SDK client
let expo = new Expo();

exports.handler = function (event, context, callback) {
  try {
    let messages = [];

    // prettier-ignore
    for (var key in event.Endpoints) {
    if (event.Endpoints.hasOwnProperty(key)) {
      var endpoint = event.Endpoints[key];

        messages.push({
          to: String(endpoint.User.UserAttributes.expoToken),
          sound: "default",
          body: event.Message.apnsmessage.body,
           data: { "status": "ok" }
        });

    }
  }

    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get
    // compressed).
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          tickets.push(...ticketChunk);
          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
        } catch (error) {
          console.error(error);
        }
      }
    })();

    // Later, after the Expo push notification service has delivered the
    // notifications to Apple or Google (usually quickly, but allow the the service
    // up to 30 minutes when under load), a "receipt" for each notification is
    // created. The receipts will be available for at least a day; stale receipts
    // are deleted.
    //
    // The ID of each receipt is sent back in the response "ticket" for each
    // notification. In summary, sending a notification produces a ticket, which
    // contains a receipt ID you later use to get the receipt.
    //
    // The receipts may contain error codes to which you must respond. In
    // particular, Apple or Google may block apps that continue to send
    // notifications to devices that have blocked notifications or have uninstalled
    // your app. Expo does not control this policy and sends back the feedback from
    // Apple and Google so you can handle it appropriately.
    let receiptIds = [];
    for (let ticket of tickets) {
      // NOTE: Not all tickets have IDs; for example, tickets for notifications
      // that could not be enqueued will have error information and no receipt ID.
      if (ticket.id) {
        receiptIds.push(ticket.id);
      }
    }

    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    async () => {
      // Like sending notifications, there are different strategies you could use
      // to retrieve batches of receipts from the Expo service.
      for (let chunk of receiptIdChunks) {
        try {
          let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
          console.log(receipts);

          // The receipts specify whether Apple or Google successfully received the
          // notification and information about an error, if one occurred.
          for (let receipt of receipts) {
            if (receipt.status === 'ok') {
              continue;
            } else if (receipt.status === 'error') {
              console.error(
                `There was an error sending a notification: ${receipt.message}`,
              );
              if (receipt.details && receipt.details.error) {
                // The error codes are listed in the Expo documentation:
                // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
                // You must handle the errors appropriately.
                console.error(`The error code is ${receipt.details.error}`);
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    callback(null, event.Endpoints);
  } catch (error) {
    callback(error);
  }
};
