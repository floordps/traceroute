app.directive('map', function($timeout, traceService) {
  return {
    restrict: 'A',
    replace: true,
    link: function(scope, element, attrs) {
      var myOptions = {
        zoom: 6,
        center: new google.maps.LatLng(37.00000, -120.00000),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById(attrs.id), myOptions);

      var input = /**@type {HTMLInputElement} */(
        document.getElementById('pac-input'));

      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      $timeout(function(){
        google.maps.event.trigger(map, 'resize');
      }, 1000);
      
      var markers = [];
      var flightPath;
      scope.$watch(function() {
        return traceService.getIp();
      }, function(newData, oldData) {
        if(!newData.length) return;
        var infowindow = new google.maps.InfoWindow();
        var marker;
        var flightPathCoordinates = [];
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
        if (typeof flightPath !== 'undefined') {
          flightPath.setMap(null);
        }
        var data = newData;
        data = data.filter(function(val) { return !!val; });
        for (var i = 0; i < data.length; i++) {
          //if(data[i] === false) continue;
          var tmp = i + 1;
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
            icon: '//chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + tmp + '|FE6256|000000',
            visible: true,
            map: map
          });
          markers.push(marker);
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent("IP: " + data[i].ip);
              infowindow.open(map, marker);
            }
          })(marker, i));
          flightPathCoordinates.push(new google.maps.LatLng(data[i].latitude, data[i].longitude));
        }
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
        flightPath = new google.maps.Polyline({
          path: flightPathCoordinates,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        flightPath.setMap(map);
      }, true);
      
    }
  };
});
