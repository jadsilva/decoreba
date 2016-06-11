
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

Array.prototype.shuffle = function() {
	for (var i = this.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = this[i];
		this[i] = this[j];
		this[j] = temp;
	}
	return this;
}

angular.module('decoreba',[]).controller('Controller', function($scope) {
	//$scope.multiplier = 2;
	$scope.ask = function () {
		var multiplicands = [];
		$scope.anwsers = [];
		/*
		$scope.anwsers = $scope.multiplicands.map(function(n) {
			return n * $scope.multiplier;
		});
		*/
		for (var i = 0; i < 9; i++) {
			multiplicands[i] = i + 1;
			$scope.anwsers[i] = multiplicands[i] * $scope.multiplier;
		}
		$scope.anwsers = $scope.anwsers.shuffle();
		var themultiplicand = randomInt(multiplicands[0], multiplicands[multiplicands.length - 1]);
		console.log('themultiplicand='+themultiplicand);
		$scope.question = $scope.multiplier + ' x ' + themultiplicand;
		$scope.anwser = function(anws) {
			if (anws == (themultiplicand * $scope.multiplier)) {
				console.log(anws + '=' + themultiplicand * $scope.multiplier);
				$scope.ask();
			} else {
				console.log('ERRO: ' + anws + '=' + themultiplicand * $scope.multiplier);
			}
		};
	};
});

