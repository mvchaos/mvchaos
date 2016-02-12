module.exports = {
  allEvents: function(req, res, next){
    res.send('queried for all events');
  },

  newEvent: function(req, res, next){
    console.log('req: ', req);
    console.log('tried to add new event');
  }
};
