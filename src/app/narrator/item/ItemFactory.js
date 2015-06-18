'use strict';
/**
 * @ngdoc service
 * @name narrator.factory:ItemFactory
 * @description
 * 
 * Provides Item object creators
 */
angular.module('narrator').factory('ItemFactory', [function () {
    var baseUrl = 'narrator/item/';
    var Item = function (content, url) {
      this.content = content;
      this.type;
    };
    Item.prototype = {
      buildItem: function (item) {
        if (!item.content) {
          throw new TypeError('Item content ');
        }
        if (item instanceof Item) {
          return item;
        }
        var type = item.type;
        switch (type) {

        case 'text':
          return new TextItem(item.content);
        case 'link':
          return new LinkItem(item.content);
        case 'code':
          return new CodeItem(item.content);
        case 'vcode':
          return new VCodeItem(item.content);
        case 'audio':
          return new AudioItem(item.content);
        case 'video':
          return new VideoItem(item.content);
        case 'picture':
          return new PictureItem(item.content);
        default:
          throw new TypeError('Unknown item type', item);
        }
      },
      isLinkItem: function () {
        return this instanceof LinkItem;
      },
      isVideoItem: function () {
        return this instanceof VideoItem;
      },
      isPictureItem: function () {
        return this instanceof PictureItem;
      },
      isVCodeItem: function () {
        return this instanceof VCodeItem;
      },
      isAudioItem: function(){
        return this instanceof AudioItem;
      },
      isCodeItem: function () {
        return this instanceof CodeItem;
      },
      isTextItem: function () {
        return this instanceof TextItem;
      },
      isEmptyItem: function () {
        return this instanceof EmptyItem;
      },
      isItem: true
    };
    var TextItem = function (content) {
      Item.call(this, content);
    };
    TextItem.prototype = Object.create(Item.prototype);
    TextItem.prototype.type = 'text';
    TextItem.prototype.clone = function () {
      return new TextItem(this.content);
    };
    var VideoItem = function (content) {
      Item.call(this, content);
    };
    VideoItem.prototype = Object.create(Item.prototype);
    VideoItem.prototype.type = 'video';

    var AudioItem = function (content) {
      Item.call(this, content);
      this.content = this.content || {src:'./test.mp3',wait:true};
    };
    AudioItem.prototype = Object.create(Item.prototype);
    AudioItem.prototype.type = 'audio';

    var PictureItem = function (content) {
      Item.call(this, content);
    };
    PictureItem.prototype = Object.create(Item.prototype);
    PictureItem.prototype.type = 'picture';
    var CodeItem = function (content) {
      Item.call(this, content);
    };
    CodeItem.prototype = Object.create(Item.prototype);
    CodeItem.prototype.type = 'code';
    var VCodeItem = function (content) {
      Item.call(this, content);
    };
    VCodeItem.prototype = Object.create(Item.prototype);
    VCodeItem.prototype.type = 'vcode';
    VCodeItem.prototype.clone = function () {
      return new VCodeItem(this.content);
    };
    var LinkItem = function (content) {
      Item.call(this, content);
    };
    LinkItem.prototype = Object.create(Item.prototype);
    LinkItem.prototype.type = 'link';
    var EmptyItem = function () {
      Item.call(this, 'Empty');
    };
    EmptyItem.prototype = Object.create(Item.prototype);
    EmptyItem.prototype.type = 'empty';
    return {
      baseTemplateUrl: baseUrl,
      Item: Item,
      TextItem: TextItem,
      VideoItem: VideoItem,
      PictureItem: PictureItem,
      VCodeItem: VCodeItem,
      CodeItem:CodeItem,
      LinkItem: LinkItem,
      EmptyItem: EmptyItem,
      AudioItem: AudioItem
    };
  }]);