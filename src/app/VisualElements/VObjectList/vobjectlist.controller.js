angular.module("VisualElements").controller("VObjectListCtrl", ['$scope',
	function($scope){
		$scope.selected = Object.keys($scope.items)[0];
		$scope.newVObjectName = "";
		$scope.adding = false;

		$scope.hideInput = function(){	
			$scope.adding = false;
			$scope.newVObjectName = "";
		}

		$scope.select = function(key){
			$scope.onselect({'key': key});
			$scope.selected = key;
		}

		$scope.remove = function(key){
			$scope.onremove({'key': key});
		}

		$scope.add = function(key){
			$scope.hideInput();
			$scope.onadd({'key': key});
		}

		$scope.link = function(scope, element, attrs){
			console.log(element);
		}
	}
]);