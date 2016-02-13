angular.module('booletin.events',[])

.controller('EventController', function ($scope, Events, $state){
  $scope.queryZip = {};
  $scope.events = {};
  $scope.getEvents = function (){
    Events.queryLocation($scope.queryZip)
      .then(function (events){
        Events.targetZips = [];
        Events.lastLookup = $scope.queryZip.zipcode;
        for (var i = 0; i < events.data[0].zip_codes.length; i++) {
          Events.targetZips.push(events.data[0].zip_codes[i].zip_code)
        }
        $state.go('events');
      })
      .catch(function(error){
        console.error(error);
      });
  };
  console.log("Saved Lookup", Events.lastLookup);
  console.log("Target Zips", Events.targetZips);
});