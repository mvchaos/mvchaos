angular.module('booletin',['ui.router'])
// 'booletin.services', 'booletin.events'
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/search');
  $stateProvider
    .state('search',{
      url: '/search',
      templateUrl: "search.html"
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