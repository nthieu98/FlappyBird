/**
 * Created by hieun on 10/25/2019.
 */

var GameLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        winSize = cc.director.getWinSize();
    }
});

GameLayer.scene = function(){
    var scene = new cc.Scene();
    var layer = new GameLayer();
    scene.addChild(layer);
    return scene;
};