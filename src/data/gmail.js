/**
 * @license
 * Copyright Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// [START gmail_quickstart]
//const fs = require('fs');


const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const token = {"access_token":"ya29.Il-pB4-S9ZfCIhGVk_IatyWXt_cUQiN_0G7ZXxni9rUbOwH96coNfcPk2H3F5zDb5gD12-2N_49ENUiZrE-JvMmkkuW0QaFoLcdCxrbp8uZkS8Pbpbi5V92rXRe5iTxK6g","scope":"https://www.googleapis.com/auth/gmail.readonly","token_type":"Bearer","expiry_date":1572404537057};
const content = {"installed":{"client_id":"519882293144-ho53n19447o521tg4jtgngig6kuqg5ku.apps.googleusercontent.com","project_id":"quickstart-1567449523386","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"WZeGCQd7ODhrBEBQC7i7LA9C","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}};


var oAuth2Client;

//console.log(fs);
// Load client secrets from a local file.
authorize(content, listLabels);

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 */
function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
    oAuth2Client.setCredentials(token);
    //callback(oAuth2Client);
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
/*
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'online',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}*/

const meeting_attendees = ["jonathandai1226@gmail.com", "annadeng2020@u.northwestern.edu"]

function transformMeetingAddressesForQuery(email_arr) {
  if (email_arr.length === 0) {
    return ""
  }
  else {
    let str = "from: "
    meeting_attendees.map((email) => {
      str = str + email + ", "
    })
    console.log(str)
    return str;
  }
}


/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(token2,query) {
  console.log("QUERY:" + query);
  const {client_secret, client_id, redirect_uris} = content.installed;
  oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // filename:ics pulls emails with calendar events

  // Check if we have previously stored a token.
  oAuth2Client.setCredentials(token2);
  var auth = oAuth2Client;
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.messages.list({
    userId: 'me',
    maxResults: 1,
    q: query,
    // q: transformMeetingAddressesForQuery(meeting_attendees),
  }, (err, res) => {
    if(err) return console.log('Err: ' + err);
    console.log(res)
    const mess = res.data.messages;
    if(mess && mess.length){
      console.log('Messages:');
      mess.forEach((mes) => {
        console.log(`- ${mes.id}`);
        return getMessage(auth, 'me', mes.id);
      });
    } else {
      console.log('No messages found.');
    }
  });
}

function listFirstMessage(token2){
  const {client_secret, client_id, redirect_uris} = content.installed;
  oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
    oAuth2Client.setCredentials(token2);
  var auth = oAuth2Client;
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.messages.list({
    userId: 'me',
    maxResults: 1,
  }, (err, res) => {
    if(err) return console.log('Err: ' + err);
    const mess = res.data.messages;
    if(mess.length){
      console.log('Messages:');
      mess.forEach((mes) => {
        console.log(`- ${mes.id}`);
      });
    } else {
      console.log('No messages found.');
    }
  });
}

/**
 * Get Message with given ID.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} messageId ID of Message to get.
 * @param  {Function} callback Function to call when the request is complete.
 */
function getMessage(auth=oAuth2Client, userId, messageId) {
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.messages.get({
    userId: userId,
    id: messageId,
  }, (err, res) => {
    if(err) return console.log('Err: ' + err);
    console.log(res.data);
    const mess = res.data["payload"]["parts"][0]["body"]["data"];
    //console.log(res.data["payload"]["body"]);
    //console.log(res);
    if(typeof mess == "string"){
      console.log(Buffer.from(mess, 'base64').toString());
      //const readableMessage =
      return Buffer.from(mess, 'base64').toString();
    }
    //console.log(readableMessage);
  });
}

function getAttachment(auth=oAuth2Client, userId, messageId, attachmentId){
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.messages.attachments.get({
    id: attachmentId,
    messageId: messageId,
    userId: userId
  }, (err,res) => {
    if(err) return console.log('Err: ' + err);
    const attach = res.data;
    console.log(attach);
  });
}
// [END gmail_quickstart]

module.exports = {
  SCOPES,
  listLabels,
  listFirstMessage,
};
