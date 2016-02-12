angular.module('booletin.services', [])

.factory('Events', function($http){
  var queryLocation = function(zip) {
    return $http({
      method: 'POST',
      url: '/api/events',
      data: zip
    });
  };

  var addEvent = function(eventData) {
    return $http({
      method: 'POST',
      url: '/api/events',
      data: eventData
    })
  };

  return {
    queryLocation: queryLocation,
    addEvent: addEvent
  };

})