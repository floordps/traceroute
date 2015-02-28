app.controller('traceCtrl', function($scope, $http, $timeout, $location, traceService) {
  $scope.startTrace = function() {
    var q = $scope.url || '';
    $scope.load = true;
    $timeout(function() {
      $scope.load = false;
    }, 2000);
    traceService.queryIp(q);
    $location.path('/map');
  }
});

app.controller('detailsCtrl', function($scope, traceService) {
  $scope.routes = traceService.getIp();
});
