angular.module('booletin.events',[])

.controller('EventController', function ($scope, Events){
  $scope.location = {};
  $scope.events = {};
  $scope.getEvents = function (){
    Events.queryLocation($scope.events)
      .then(function (events){
        $scope.events = events;
      })
      .catch(function(error){
        console.error(error);
      });
  };
  $scope.getEvents();
});