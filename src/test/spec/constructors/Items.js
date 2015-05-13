'use strict';

describe('Item constructors', function() {

 it('checks content item ', function() {
      
      expect(new LinkItem() instanceof Item).toEqual(true);
    });
 
});