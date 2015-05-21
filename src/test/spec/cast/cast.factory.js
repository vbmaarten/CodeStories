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

  

/*
  var Person;
  beforeEach(module('myApp'));
  beforeEach(inject(function (_Person_) {
    Person = _Person_;
  }));

  describe('Constructor', function () {

    it('assigns a name', function () {
      expect(new Person('Ben')).to.have.property('name', 'Ben');
    });

  });*/

});