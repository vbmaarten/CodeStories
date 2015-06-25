'use strict';

describe('Factory: Notifications factory', function() {
  // ---- Initialization ----
  beforeEach(module('codeStoriesApp'));

  var notificationsFactory

  beforeEach(inject(function (_notificationsFactory_){
      notificationsFactory = _notificationsFactory_;
      notificationsFactory.registerObserverCallback(function(){ })

  }));

  

  // ---- Tests -----
  it("should exist", function(){
  	expect(notificationsFactory).toBeDefined();
  });


  it("should be possible to show an error notification", function(){
    notificationsFactory.error('an error')
    expect( notificationsFactory.notifications[0].type ).toEqual("error");
    
  });

    it("should be possible to show an info notification", function(){
        notificationsFactory.info('info')

    expect( notificationsFactory.notifications[0].type ).toEqual("info");
    
  });

  it("should be possible to show an success notification", function(){
          notificationsFactory.success('something succeded')

    expect( notificationsFactory.notifications[0].type ).toEqual("success");
    
  });





});
