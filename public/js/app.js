angular.module('booletin',[
  'booletin.services',
  'booletin.events',
  'ui.router'])
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
      templateUrl: 'add.html'
    })
    .state('events', {
      url: '/events',
      templateUrl: 'events.html'
    })
})