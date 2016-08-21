angular.module('chat', []).
controller('ChatController', ['$scope', '$http', function($scope, $http) {
	$scope.io = io();
	$scope.message = '';
	$scope.recipientMessages = document.getElementById('content-messages');

	$scope.io.on('recive_message', function(data) {
		$scope.recipientMessages.innerHTML =
			$scope.recipientMessages.innerHTML +
			'<p>' + data.message + '<p>';
	});

	$scope.sendMessage = function() {
		if($scope.message) {
			$scope.io.emit('sended_message', {
				message: $scope.message
			});
			$scope.message = '';
		}
	}

}]);
