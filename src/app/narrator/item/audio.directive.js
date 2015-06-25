'use strict';

angular.module('narrator').directive('audioItem', function () {
  return {
    restrict: 'AE',
	templateUrl: function (elem, attr) {
        return 'narrator/item/' + attr.type + '.html';
      },
    link: function(scope,elem,attr){
    	if( scope.auto && scope.item.content.wait ){
    		scope.auto.playingItem = true;	
    	}
    	

    	elem[0].querySelector('audio').addEventListener("ended", function() 
     	{
          if(scope.auto && scope.item.content.wait){
          	scope.auto.playingItem = false;
          }
          
     	});

    }
  };
})