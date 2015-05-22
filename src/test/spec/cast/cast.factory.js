'use strict';

describe('Factory: CAST', function () {


  // load the controller's module
  beforeEach(module('cast'));

  var CAST;

  beforeEach(inject(function (_CAST_){
    CAST = _CAST_;
  }));

  it('should start of with an empty cast', function () {
    expect(CAST.cast).toEqual({'rootnode': new FolderNode('rootnode', null, {})});
  });

  

});