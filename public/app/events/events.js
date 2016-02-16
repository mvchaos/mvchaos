angular.module('booletin.events',[])

.controller('EventController', function ($scope, Events, $state, $firebaseArray){
  var dbConnection = new Firebase("https://booletin.firebaseio.com/events");
  $scope.events = $firebaseArray(dbConnection);

  $scope.queryZip = {};
  // $scope.events = {};
  $scope.getEvents = function (){
    Events.queryLocation($scope.queryZip)
      .then(function (response){
        Events.targetZips = [];
        Events.lastLookup = $scope.queryZip.zipcode;
        for (var i = 0; i < response.data[0].zip_codes.length; i++) {
          Events.targetZips.push(response.data[0].zip_codes[i].zip_code)
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