angular.module('booletin',[
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
        Events.queryLocation(parseInt(viewValue))
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
