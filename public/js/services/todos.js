angular.module('appService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}])
	.factory('NewRelic', ['$http',function($http) {
		var traceroute = function(ipaddress){
			$http.post('/api/traceroute', {ipaddress: ipaddress});
		};
		var sendToNewRelic = function(ipaddress){
			//collect network data info
			var connection = window.navigator.connection || window.navigator.mozConnection || null;
			if (connection === null) {} 
			else if ('metered' in connection) {}
			else {	
				newrelic.addPageAction("network", {
					"downLink": connection.downlink,
					"effectiveType": connection.effectiveType,
					"rtt": connection.rtt,
					"ip": ipaddress
				});
			}
		};
		var sendNetworkDataToNR = function(){
			$http.get('http://ipapi.co/json/').then(function(result){	//collect IP address
				sendToNewRelic(result.data.ip);
				traceroute(result.data.ip);
			}, function(error){
				sendToNewRelic(null)
			});			
		};
	
		return {sendNetworkDataToNR};
	}]);

	
	