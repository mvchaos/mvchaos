angular.module('booletin',[
  'ngMap',
  'booletin.services',
  'booletin.events',
  'booletin.add',
  'ui.router',
  'firebase'])
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
      url: '/events/:search',
      templateUrl: 'events.html',
      controller: 'EventController'
    })
})
.controller('mapController', function($scope, NgMap,$http) {
  $scope.loc = {}

  $http({
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent($scope.event.streetAddress)+'&key=AIzaSyC7IPmYQhDK-tr4w9i9DLflO3ahjeuAbxc'
  }).then(function successCallback(response) {
    $scope.loc.x = response.data.results[0].geometry.location.lat || 1;
    $scope.loc.y = response.data.results[0].geometry.location.lng || 1;
  }, function errorCallback(response) {
    console.log('not valid address',response);
  })
        NgMap.getMap().then(function(map) {
            $scope.map = map;
        });
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

.directive('validZip', function($q, Events) {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$asyncValidators.validZip = function(modelValue, viewValue) {
        var def = $q.defer();
        var viewObject =  {
           zipcode : viewValue
        }

        Events.queryLocation(viewObject)
        .then(function(response){
          if(response.data[0]['zip_codes']){
            def.resolve();
          } else {
            def.reject();
          }
        });
        return def.promise;
      };
    }
  };
});
