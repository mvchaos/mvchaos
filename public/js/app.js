angular.module('booletin',[
  'booletin.services',
  'booletin.events',
  'ui.router',
  'firebase'])
// 'booletin.services', 'booletin.events'
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/search');
  $stateProvider
    .state('search',{
      url: '/search',
      templateUrl: "search.html",
      controller: 'EventController'
    })
    .state('add', {
      url: '/add',
      templateUrl: 'add.html',
      controller: 'addEvents'
    })
    .state('events', {
      url: '/events',
      templateUrl: 'events.html',
      controller: 'EventController'
    })
})

.controller('addEvents',function ($scope, $firebaseArray, $firebaseObject, $state){
  var dbConnection = new Firebase("https://booletin.firebaseio.com/events");
  $scope.events = $firebaseArray(dbConnection);
  $scope.newEvent = {
    photo: ""
  };
  var today = new Date();
  $scope.today = today.toISOString();
  console.log($scope.today);
  $scope.getImage = function(){
    var files = document.getElementById('fileInput').files;
    var file = files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
      document.getElementById('preview').setAttribute('src', reader.result);
      $scope.newEvent.photo = reader.result;
    }
    reader.readAsDataURL(file);
  };

  $scope.addEvent = function(){
    $scope.events.$add({
      zipCode : $scope.newEvent.zipCode,
      eventName : $scope.newEvent.eventName,
      streetAddress : $scope.newEvent.streetAddress,
      eventDescription : $scope.newEvent.eventDescription,
      startDate : $scope.newEvent.startDate.toString().slice(0, 15),
      time : $scope.newEvent.time.toString().slice(15, 21) + ' ' + $scope.newEvent.time.toString().slice(35, 38),
      photo : $scope.newEvent.photo,
      tags : $scope.newEvent.tag
    });
    $state.go('events');
  }
})

.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
})
