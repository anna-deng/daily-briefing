import gapi from 'gapi-client'



function printCalendar() {
  // The "Calendar ID" from your calendar settings page, "Calendar Integration" secion:
  var calendarId = 'YOUR_CALENDAR_ID@group.calendar.google.com';

  // 1. Create a project using google's wizzard: https://console.developers.google.com/start/api?id=calendar
  // 2. Create credentials:
  //    a) Go to https://console.cloud.google.com/apis/credentials
  //    b) Create Credentials / API key
  //    c) Since your key will be called from any of your users' browsers, set "Application restrictions" to "None",
  //       leave "Website restrictions" blank; you may optionally set "API restrictions" to "Google Calendar API"
  var apiKey = 'YOUR_API_KEY';
  // You can get a list of time zones from here: http://www.timezoneconverter.com/cgi-bin/zonehelp
  var userTimeZone = "Europe/Budapest";

  // Initializes the client with the API key and the Translate API.
  gapi.client.init({
    'apiKey': apiKey,
    // Discovery docs docs: https://developers.google.com/api-client-library/javascript/features/discovery
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  }).then(function () {
    // Use Google's "apis-explorer" for research: https://developers.google.com/apis-explorer/#s/calendar/v3/
    // Events: list API docs: https://developers.google.com/calendar/v3/reference/events/list
    return gapi.client.calendar.events.list({
      'calendarId': calendarId,
      'timeZone': userTimeZone,
      'singleEvents': true,
      'timeMin': (new Date()).toISOString(), //gathers only events not happened yet
      'maxResults': 20,
      'orderBy': 'startTime'
    });
  })
};

// Loads the JavaScript client library and invokes `start` afterwards.
gapi.load('client', printCalendar);