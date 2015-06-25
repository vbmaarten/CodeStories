'use strict';


describe('Module: Narrator', function(){
  
  beforeEach(module('codeStoriesApp'));

  beforeEach(module(function ($provide) {
    $provide.value('$state', {
      state: undefined,
      go : function (state, params) {
        this.state = state;
        this.params = params;
      },
      is :function(state) {
        return this.state == state;
      }
    });
  }));

  beforeEach(module(function ($provide) {
    $provide.value('interpreterFactory', {
      debugStep: {},
      narrativeStep: {},
      setupNarratedAST : function (CASTNode, narrative) {
        this.narrative = narrative;
      },
      narrativeStep : function() {
        return this.narrativeStep;
      },
      reset : function() {},
      debugStep: function(){
        return this.debugStep;
      },
    });
  }));

  var CAST,
      folderNode,
      fileNode,
      astNode,
      CASTNodeFactory;

  beforeEach(inject(function (_CAST_, _CASTNodeFactory_){
    CASTNodeFactory = _CASTNodeFactory_;
    CAST = _CAST_;
    folderNode = CAST.cast.rootnode.children['folderNode'] = new CASTNodeFactory.FolderNode('folderNode', CAST.cast.rootnode, {});
    fileNode = folderNode.children['fileNode.js'] = new CASTNodeFactory.FileNode('fileNode.js', folderNode, { });
    astNode = fileNode.children['program'] = new CASTNodeFactory.ASTNode('program', fileNode, {}, null);

    CAST.appendNarrative(narrativesMock);
  }));

  describe('Factory: Viewer', function() {

    var narrator;

    beforeEach(inject(function (_viewerFactory_){
      narrator = _viewerFactory_;
    }));


    it('should start out with a default viewer state', function() {
      expect(narrator.queue.length).toBe( 0 );
      expect(narrator.queueCounter.length).toBe( 0 );
      expect(narrator.queuePaths.length).toBe( 0 );
      expect(narrator.storyboard.length).toBe( 0 );
      expect(narrator.lastCodeNarrativeNode).toBe( "" );
    });

    it('should be able to push a narrative on the narrative queue', function(){
      narrator.pushNarrative(CAST.getNarrative('/folderNode', 0));
      expect(narrator.queue.length).toBe( 1 );
      expect(narrator.queue[0].name).toBe( narrativesMock['/folderNode'][0].name );
      expect(narrator.queueCounter[0]).toBe( 0 );
      expect(narrator.storyboard[0].name).toBe( narrativesMock['/folderNode'][0].name );

      narrator.pushNarrative(CAST.getNarrative('/folderNode/fileNode.js/program', 0));
      expect(narrator.queue.length).toBe( 2 );
    });

    it('should be able to select a narrative for playing', inject(function ($state) {
      narrator.selectNarrative(CAST.getNarrative('/folderNode', 0));
      expect($state.state).toBe( 'narrating.viewing.playing' );
    }));

    it('should be able to deselect a narrative', inject(function($state) {
      narrator.selectNarrative(CAST.getNarrative('/folderNode', 0));
      expect(narrator.queue.length).toBe( 1 );
      expect($state.state).toBe( 'narrating.viewing.playing' );

      narrator.deselectNarrative();
      expect(narrator.queue.length).toBe( 0 );
      expect($state.state).toBe( 'narrating.viewing.selecting' );
    }));


    it('should be possible to pop an item from the narrative queue', inject(function ($state){
      narrator.selectNarrative(CAST.getNarrative('/folderNode', 0));
      narrator.pushNarrative(CAST.getNarrative('/folderNode/fileNode.js', 0));
      narrator.queuePaths.push('somepath');
      expect(narrator.queue.length).toBe( 2 );

      narrator.popNarrative();
      expect(narrator.queue.length).toBe( 1 );
      expect($state.params.path).toBeDefined();

      narrator.popNarrative();
      expect(narrator.queue.length).toBe( 0 );
    }));

    it('should perform a narrative step, where it either adds an item or pops the narrative', function(){
      narrator.selectNarrative(CAST.getNarrative('/folderNode', 0));
      expect(narrator.storyboard.length).toBe( 1 );
      expect(narrator.storyboard[0].items.length).toBe( 0 );

      narrator.step();

      expect(narrator.storyboard[0].items.length).toBe( 1 );
    });

    it('should load a narrative from a narrative link', inject(function ($state){
      expect($state.params).toBeUndefined();

      narrator.loadNarrative({
        "type": "link",
        "content": {"id":"hello world narrative 2","path":"/folderNode/fileNode.js"}
      });

      expect($state.params.path).toBe("/folderNode/fileNode.js");
    }));

    it('should perform a code narrative step, where it adds an item from a code narrative to the storyboard', inject(function (interpreterFactory, $state){
      expect(narrator.codeNarrativeStep()).toBe( false );

      narrator.pushNarrative(CAST.getNarrative('/folderNode/fileNode.js/program', 0));
      interpreterFactory.narrativeStep.item = interpreterFactory.narrative.narrativeHooks['/Body/0FunctionDeclaration/Block/Body/0VariableDeclaration'].items[0];
      interpreterFactory.narrativeStep.item.isVCodeItem = function(){return false};
      interpreterFactory.narrativeStep.item.isTextItem = function(){return false};
      interpreterFactory.narrativeStep.node = {getPath:function(){return '/folderNode/fileNode.js/program'}}

      expect(narrator.codeNarrativeStep()).toBe( true );
      expect(narrator.storyboard[0].items.length).toBe( 1 );
      expect($state.params['path']).toBe('/folderNode/fileNode.js/program');
    }));

    it('should perform a debugstep where it only advances one step in the interpreter', inject(function(interpreterFactory, $state){
      interpreterFactory.debugStep.node = {getPath:function(){return '/folderNode/fileNode.js/program'}}

      narrator.debugStep()

      expect($state.params['path']).toBe('/folderNode/fileNode.js/program');

    }));

  });


  describe('Factory: Writer', function() {

    var writer;
    var $state;

    beforeEach(inject(function (_writerFactory_, _$state_){
      writer = _writerFactory_;
      $state = _$state_;
    }));

    it('should select a narrative for editing', function() {
      expect(writer.selectedNarrative).toBeUndefined();
      writer.selectNarrative(CAST.getNarrative('/folderNode', 0));
      expect(writer.selectedNarrative).toBeDefined();
      expect($state.state).toBe('narrating.writing.editing');
    });

    it('should deselect a narrative that was selected', function () {
      expect(writer.selectedNarrative).toBeUndefined();
      writer.deselectNarrative();
      expect(writer.selectedNarrative).toBeUndefined();
      writer.selectNarrative(CAST.getNarrative('/folderNode', 0));
      expect(writer.selectedNarrative).toBeDefined();
      writer.deselectNarrative();
      expect(writer.selectedNarrative).toBeUndefined();
      expect($state.state).toBe('narrating.writing.selecting');
    });

    it('should add a new narrative to a passed node', function () {
      expect(CAST.narratives['/folderNode'].length).toBe( 1 );
      writer.addNarrative(CAST.getNode('/folderNode'));
      expect(CAST.narratives['/folderNode'].length).toBe( 2 );

      expect(CAST.narratives['/folderNode/fileNode.js/program'].length).toBe( 1 );
      writer.addNarrative(CAST.getNode('/folderNode/fileNode.js/program'));
      expect(CAST.narratives['/folderNode/fileNode.js/program'].length).toBe( 2 );
    });
  });

  describe('Controller: Writer', function(){
    var writerFactory;
    var $state;
    var $scope;

    beforeEach(inject(function (_writerFactory_, _$state_, $rootScope, $controller){
      $state = _$state_;
      $scope = $rootScope.$new();
      writerFactory = _writerFactory_;
      $state.go('narrating.writing.editing');
      CAST.setSelected('/folderNode');
      writerFactory.selectNarrative(CAST.getNarrative('/folderNode', 0));
      $controller('WriterCtrl', {$scope : $scope});
    }));

    it('should get the correct narrative when state is editing', function (){
      expect($scope.selectedNarrative).toBe(writerFactory.selectedNarrative);
      expect($scope.selectedNarrative).toBe(CAST.getNarrative('/folderNode', 0));
    });

    it('should deselect a narrative and switch state after', inject(function ($rootScope, $controller){
      expect($state.state).toBe('narrating.writing.editing');
      $scope.deselectNarrative();
      expect($state.state).toBe('narrating.writing.selecting');
      $scope = $rootScope.$new();
      $controller('NarratorCtrl', {$scope: $scope});
       $controller('WriterCtrl', {$scope : $scope});
      expect($scope.selectedNarrative).toBeUndefined();
    }));

    it('should add an item to the current narrative', inject(function ($controller) {
      expect($scope.selectedNarrative.items.length).toBe(3);
      $scope.addItem();
      expect($scope.selectedNarrative.items.length).toBe(4);
      
      $scope.selectNarrative(CAST.getNarrative('/folderNode/fileNode.js/program',0));
      CAST.selectedPath = '/folderNode/fileNode.js/program/Body';
      $controller('WriterCtrl', {$scope : $scope});
      expect($scope.selectedNarrative.narrativeHooks['/Body']).toBeUndefined();
      $scope.addItem();
      expect($scope.selectedNarrative.narrativeHooks['/Body']).toBeDefined();
    }));

    it('should remove an item from the current narrative', function() {
      expect($scope.selectedNarrative.items.length).toBe(3);
      $scope.removeItem($scope.selectedNarrative.items[0]);
      expect($scope.selectedNarrative.items.length).toBe(2);
    });

    it('should check if the current state is compatible with the current selected node', inject(function ($state, $controller){
      CAST.selectedPath = '/';
      expect($state.state).toBe('narrating.writing.editing');
      $controller('WriterCtrl', {$scope : $scope});
      expect($state.state).toBe('narrating.writing.selecting');
    }));

    describe('when selecting', function() {
      beforeEach(inject(function (_writerFactory_, _$state_, $rootScope, $controller){
        $state = _$state_;
        $scope = $rootScope.$new();
        writerFactory = _writerFactory_;
        $state.go('narrating.writing.selecting');
        $controller('NarratorCtrl', {$scope: $scope});
        $controller('WriterCtrl', {$scope : $scope});
      }));

      it('should be able to select a node', function (){
        $scope.selectNarrative(CAST.getNarrative('/folderNode/fileNode.js', 0));
        expect($scope.selectedNarrative).toBe(CAST.getNarrative('/folderNode/fileNode.js', 0));
        expect($scope.selectedNarrative).toBe(writerFactory.selectedNarrative);
        expect($state.state).toBe('narrating.writing.editing');
      });

      it('should add a narrative and display it in the scope', function(){
        expect($scope.narratives.length).toBe(1);
        $scope.addNarrative();
        expect($scope.narratives.length).toBe(2);
      });

      it('should remove a narrative from the list and from the scope', function(){
        expect($scope.narratives.length).toBe(1);
        $scope.removeNarrative(CAST.getNarrative('/folderNode', 0));
        expect($scope.narratives.length).toBe(0);
      });

    });

  });

});

