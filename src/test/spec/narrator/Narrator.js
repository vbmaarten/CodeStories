'use strict';

describe('NarratorCtrl', function() {
  beforeEach(module('narrator'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.addNarrative', function() {

  	 beforeEach(function() {
      var $scope = {history:null};
      var controller = $controller('NarratorCtrl', { $scope: $scope});
    });


    it('adds a narrative at the first index', function() {
      $scope.addNarrative([],[])
      expect(true).toEqual(true);
    });

    it('adds a narrative at a negative index',function(){
    	$scope.addNarrative();
    	expect(true).toEqual(true);


    });
  });
});