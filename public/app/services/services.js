angular.module('booletin.services', [])

.factory('Events', function($http){
  var queryLocation = function(zip) {
    console.log('made it into query');
    return $http({
      method: 'POST',
      url: '/api/location',
      data: zip
    });
  };

  var addEvent = function(eventData) {
    return $http({
      method: 'POST',
      url: '/api/events',
      data: eventData
    });
  };

  var targetZips = [];
  var targetZipsString = "";
  var lastLookup = "";
  var events = [];
  return {
    queryLocation: queryLocation,
    addEvent: addEvent,
    lastLookup: lastLookup,
    targetZips: targetZips,
    targetZipsString: targetZipsString,
    events : events
  };

})
