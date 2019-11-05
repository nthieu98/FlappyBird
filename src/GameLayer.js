/**
 * Created by hieun on 10/25/2019.
 */

var GameLayer = cc.Layer.extend({
    _bird: null,
    timeSpawn: 3,
    gameover: false,
    gamestatus: 'waiting',
    score: 0,
    scoreLabel: null,
    base: null,

    ctor:function(){
        this._super();
        this.init();

    },
    init:function(){
        winSize = cc.director.getWinSize();
        cc.log("Init");


        //this._bird = new cc.Sprite(res.bluebird_midflap, cc.rect(0, 0, 34, 24));
        //this._bird.attr({
        //    anchorX: 0,
        //    anchorY: 0,
        //    x: winSize.width / 2,
        //    y: winSize.height / 2,
        //    scale: 1.5
        //})
        this._bird = new Bird();

        this.addChild(this._bird, 3);
        this.initBackGround();
        this.addKeyboardListener();

        var st = this.score.toString();
        this.scoreLabel = new cc.LabelBMFont(st, "res/fonts/flappyBird.fnt");
        this.scoreLabel.attr({
            anchorX: 0,
            anchorY: 0,
            x: winSize.width / 2,
            y: winSize.height * 4 /5
        });
        this.addChild(this.scoreLabel, 3);

        this.scheduleUpdate();

    },
    initBackGround:function(){
        cc.log("Load background");
        var loadBackGround = new cc.Sprite(res.background_day);
        loadBackGround.anchorX = 0;
        loadBackGround.anchorY = 0;
        loadBackGround.setScale(1.7);
        this.addChild(loadBackGround, 1);

        var base = new cc.Sprite(res.base, cc.rect(0, 0, winSize.width, winSize.height/6));
        base.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0,
            scale: 1.5
        });
        this.base = base;
        this.addChild(base, 3);


        return true;
    },
    addKeyboardListener: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(key, event){
                //cc.log(key);
                if(key == 32 && self.gamestatus == 'gameover') {
                    //self._bird.x += 10;
                    self.restart();
                }
            }
        }, this);
    },

    update: function(dt){
        if(this.gamestatus != 'playing')
            return;
        this.timeSpawn -= dt ;
        //cc.log(this.timeSpawn);
        //this._bird.y -= dt * 100;
        var st = this.score.toString();
        this.scoreLabel.setString(st);
        if(this.checkCollision(this.base, this._bird)){
            this.gameOver();
        }
        if(this.timeSpawn < 0){
            var _pipe = new Pipe();
            var _reversePipe = new Pipe(_pipe);
            this.addChild(_pipe, 1);
            //_pipe.runAction(cc.moveBy (6, -winSize.width - 100, 0));
            this.addChild(_reversePipe, 1);
            //_reversePipe.runAction(cc.moveBy (6, -winSize.width - 100, 0));
            this.timeSpawn = 3;
        }

    },
    checkCollision: function (rectObj, bird){
        //cc.log("check collision");
        var rect = rectObj.getBoundingBox();
        var birdPos = bird.getPosition();

        if(birdPos.x >= rect.x && birdPos.x <= rect.x + rect.width &&
            birdPos.y >= rect.y && birdPos.y <= rect.y + rect.height){
            //cc.log("collision");
            return true;
        }
        //cc.log("non-collision");
        return false;
    },
    checkAcross: function(rectObj, bird){
        //cc.log("check across");
        var rect = rectObj.getBoundingBox();
        var birdPos = bird.getPosition();
        //cc.log(birdPos.x);
        //cc.log(rect.x + rect.width);
        if(birdPos.x > rect.x + rect.width){
            cc.log("acrossed");
            return true;
        }
        //cc.log("non-across");
        return false;
    },
    gameOver: function(){
        //this.gameover = true;
        this.gamestatus = 'gameover';
        this.);
        //cc.log(this.gamestatus);
        this.unscheduleUpdate();
        var gameover = new cc.Sprite(res.gameOver);
        gameover.attr({
            anchorX: 0,
            anchorY: 0,
            x: winSize.width / 2 - 100,
            y: winSize.height / 2
        })
        this.addChild(gameover, 2);
        //this.addKeyboardListener();

    },
    restart:function() {

        if (this.gamestatus == 'gameover') {
            cc.director.runScene(GameLayer.scene());
        }
    }
});

GameLayer.scene = function(){
    var scene = new cc.Scene();
    var layer = new GameLayer();
    scene.addChild(layer);
    return scene;
};