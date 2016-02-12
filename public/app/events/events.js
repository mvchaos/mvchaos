// events.js
angular.module('booletin.events',[])
.controller('eventController', function($scope, Events){
  $scope.events = {};
  $scope.getEvents = function (){
    Events.getAll()
      .then(function (events){
        $scope.data.events = events;
      })
      .catch(function(error){
        console.error(error);
      });
  };
  $scope.getEvents();
})