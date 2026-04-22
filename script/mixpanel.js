mixpanel.init('ba05ee5df8fb581ac268d8c54a181a42', {debug: false, track_pageview: true, persistence: 'localStorage'});
 
// Set this to a unique identifier for the user performing the event.
// Identify user ID.
// mixpanel.identify('USER_ID')

// Reset ID to get Device ID (as user logged out)
// mixpanel.reset();
 
// Track an event. It can be anything, but in this example, we're tracking a Sign Up event.
// mixpanel.track('Event Name', {
//   'Properties': 'Properties Value',
//   'Properties': 'Properties Value',
//   'Properties': 'Properties Value',
//   'Properties': 'Properties Value',
// })