/**
 * Created by hieun on 10/25/2019.
 */

var GameLayer = cc.Layer.extend({
    _bird: null,

    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        winSize = cc.director.getWinSize();
        cc.log("Init");
        this.initBackGround();

        this._bird = new cc.Sprite(res.bluebird_midflap);
        this._bird.attr({
            anchorX: 0,
            anchorY: 0,
            x: winSize.width / 2,
            y: winSize.height / 2,
            scale: 1.5
        })
        this.addChild(this._bird);
    },
    initBackGround:function(){
        cc.log("Load background");
        var loadBackGround = new cc.Sprite(res.background_day);
        loadBackGround.anchorX = 0;
        loadBackGround.anchorY = 0;
        loadBackGround.setScale(1.7);
        this.addChild(loadBackGround);

        //var bird = new cc.Sprite(res.bluebird_midflap);
        //bird.attr({
        //    anchorX: 0,
        //    anchorY: 0,
        //    x: winSize.width / 2,
        //    y: winSize.height / 2,
        //    scale: 1.5
        //});
        //this.addChild(bird);

        var base = new cc.Sprite(res.base);
        base.attr({
            anchorX: 0,
            anchorY: 0,
            scale: 1.5
        });
        this.addChild(base);

        return true;
    }

});

GameLayer.scene = function(){
    var scene = new cc.Scene();
    var layer = new GameLayer();
    scene.addChild(layer);
    return scene;
};