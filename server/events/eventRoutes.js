var eventsController = require('./eventController.js');

module.exports = function (app) {
  app.route('/')
    .get(eventsController.allEvents)
    .post(eventsController.newEvent);
};


