angular.module("VisualElements").controller("VObjectListCtrl", ['$scope',
	function($scope){
		$scope.selected = Object.keys($scope.items)[0];
		$scope.newVObjectName = "";
		$scope.adding = false;

		$scope.select = function(key){
			$scope.onselect({'key': key});
			$scope.selected = key;
		}

		$scope.remove = function(key){
			$scope.onremove({'key': key});
		}

		$scope.add = function(key){
			$scope.adding = false;
			$scope.newVObjectName = "";
			$scope.onadd({'key': key});
		}
	}
]);