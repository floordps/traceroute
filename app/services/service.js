app.service('traceService', function($http, $q) {
  var ip = [];

  this.getIp = function() {
    return ip;
  }

  this.queryIp = function(query) {
    ip = [];  // flush
    $http.post('/tr', {q : query})
      .success(function(data) {
        if (typeof data !== 'string') {
          for(var i = 0; i < data.length; i++) {
            if(data[i] === false) {
              ip.push(false);
            }
            else {
              var privateIp = /(^10\.)|(^192\.168\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)/;
              var k = Object.keys(data[i])[0];
              if (!k.match(privateIp)) {
                ip.push({ip: k, rtt: data[i][k][0]});
              }
            }  
          }
          ip.map(function(obj, i, arr) {
            if(obj === false) return;
            $http.get('//freegeoip.net/json/' + obj.ip)
              .success(function (data) {
                data.rtt = ip[i].rtt;
                ip[i] = data;
              });
          });
        }
      });
  }
});
