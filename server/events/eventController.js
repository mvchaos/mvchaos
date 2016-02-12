console.log('event controller');
module.exports = {
  allEvents: function(req, res, next){
    res.send('queried for all events');
    // res.end();
  },

  newEvent: function(req, res, next){
    console.log('req: ', req);
    res.send('hi');
    // res.end();
  }
};
