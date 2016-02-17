angular.module('booletin.events',[])

.controller('EventController', function ($scope, Events, $state, $firebaseArray){
  var dbConnection = new Firebase("https://booletin.firebaseio.com/events");
  $scope.events = $firebaseArray(dbConnection);
  $scope.targetZipsString = Events.targetZipsString;
  $scope.queryZip = {};
  $scope.validZip = false;
  Events.targetZipsString = "all";
  // $scope.events = {};
  $scope.getEvents = function (){
    Events.queryLocation($scope.queryZip)
      .then(function (response){
        Events.targetZips = [];
        Events.targetZipsString = "";
        Events.lastLookup = $scope.queryZip.zipcode;
        for (var i = 0; i < response.data[0].zip_codes.length; i++) {
          Events.targetZips.push(response.data[0].zip_codes[i].zip_code);
          Events.targetZipsString += (response.data[0].zip_codes[i].zip_code + ", ");
        }
        Events.targetZipsString = Events.targetZipsString.slice(0, Events.targetZipsString.length - 2);
        $state.go('events');
      })
      .catch(function(error){
        $scope.invalidZip = true;
      });
  };
  console.log("Saved Lookup", Events.lastLookup);
  console.log("Target Zips", Events.targetZips);
  console.log("Target Zips List", Events.targetZipsString);
});