var eventsController = require('./eventController.js');

module.exports = function (app) {
  app.route('api/events')
    .get(eventsController.allEvents)
    .post(eventsController.newEvent);
};


