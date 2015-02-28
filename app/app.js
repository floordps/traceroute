var app = angular.module('traceroute', ['ngRoute', 'ui.bootstrap', 'angular-ladda']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl : 'partials/index.jade',
      controller : 'traceCtrl'
    })
    .when('/map', {
      templateUrl : 'partials/map.jade',
      controller : 'traceCtrl'
    })
    .when('/details', {
      templateUrl : 'partials/details.jade',
      controller : 'detailsCtrl'
    })
    .otherwise({
      redirectTo : '/'
    });
});
