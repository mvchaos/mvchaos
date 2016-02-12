module.exports = function(app, express){
  var eventRouter = express.Router();
  app.use(express.static(__dirname + '/../../public'));
  app.use('/api/events', eventRouter);

require('../events/eventRoutes.js')(eventRouter);
};
