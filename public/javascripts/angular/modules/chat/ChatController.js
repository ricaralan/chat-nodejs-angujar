angular.module('chat', []).
controller('ChatController', ['$scope', '$http', function($scope, $http) {
	$scope.io = io();
	$scope.message = '';
	$scope.recipientMessages = $('#content-messages');
	$scope.modalChooseAvatar = $('#modalChooseAvatar');
	$scope.avatars = Object.keys([].fill.call({length:16})).slice(0, -1);
	$scope.selectedAvatar = 1;

	$scope.io.on('recive_message', function(data) {
		$scope.recipientMessages.html(
			$scope.recipientMessages.html() +
					'<div class="col-md-12 col-xs-12 col-sm-12">'
					+	'<div class="col-md-2 col-md-2 col-xs-3">'
					+		'<img src="' + $scope.getURLAvatarImage(data.avatar) + '" class="img-avatar-message">'
					+	'</div>'
					+	'<div class="col-md-10 col-sm-10 col-xs-9 message">'
					+		'<span>' + data.avatarName + ': </span>'
					+		data.message
					+ 	'</div>'
					+
					'<div>'
			);
	});

	$scope.sendMessage = function() {
		if($scope.message) {
			$scope.io.emit('sended_message', {
				avatar:  $scope.selectedAvatar,
				avatarName: $scope.avatarName,
				message: $scope.message
			});
			$scope.message = '';
		}
	};

	$scope.initChooseAvatar = function() {
		$scope.modalChooseAvatar.modal();
	};

	$scope.closeChooseAvatar = function() {
		if($scope.avatarName) {
			$scope.modalChooseAvatar.modal('hide');
		}
	};

	$scope.chooseAvatar = function(avatarI) {
		$scope.selectedAvatar = avatarI;
	};

	$scope.getURLAvatarImage = function(i) {
		return '/images/avatars/avatar' + i + '.svg';
	};

}]);
