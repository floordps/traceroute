app.directive('tabs', function($location) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'partials/_tabs.jade',
    link: function(scope, elem, attr) {
      scope.links = JSON.parse(attr.links);
      scope.isActive = function(url) {
        if(url === '#'+$location.path()) {
          return true;
        }
        return false;
      };
    }
  };
});
