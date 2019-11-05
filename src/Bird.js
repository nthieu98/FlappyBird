/**
 * Created by hieun on 10/28/2019.
 */
var Bird = cc.Sprite.extend({
    status: 'waiting',
    actions: {
        waiting: null,
        flying: null,
        animation: null
    },
    frames: [],
    initialSpeed: 100,
    jumpForce: 400,
    gravity: 1500,
    speed: 100,
    limitSpeed: 1000,

    ctor: function(){
        //this.initialSpeed. = 0;
        this._super();
        this.init();
        this.setBirdFrame();
        this.setPosition(winSize.width / 2, winSize.height / 2);
        this.waitingTap();
        this.scheduleUpdate();
        this.addKeyboardListener();
    },

    update:function(dt){
        //cc.log(this.parent.gamestatus);
        if(this.parent.gamestatus == 'playing')
            this.fall(dt);
    },

    addKeyboardListener: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(key, event){
                //cc.log(key);
                if(key == 32) {
                    if(self.parent.gamestatus == 'gameover'){
                        self.parent.restart();
                    }
                    self.parent.gamestatus = 'playing';
                    self.fly();
                }
            }
        }, this);
    },

    setBirdFrame: function() {
        cc.log("set anin");
        var k = Math.floor(cc.rand()) % 3;
        var animationFrames = [];
        //k = 0;
        if(k == 0){
            animationFrames.push(cc.SpriteFrame(res.bluebird_upflap, cc.rect(0, 0, 34, 24)));
            animationFrames.push(cc.SpriteFrame(res.bluebird_midflap, cc.rect(0, 0, 34, 24)));
            animationFrames.push(cc.SpriteFrame(res.bluebird_downflap, cc.rect(0, 0, 34, 24)));
            animationFrames.push(cc.SpriteFrame(res.bluebird_midflap, cc.rect(0, 0, 34, 24)));
        }
        else if(k == 1){
            animationFrames.push(cc.SpriteFrame(res.yellowbird_upflap, cc.rect(0, 0, 34, 24)));
            animationFrames.push(cc.SpriteFrame(res.yellowbird_midflap, cc.rect(0, 0, 34, 24)));
            animationFrames.push(cc.SpriteFrame(res.yellowbird_downflap, cc.rect(0, 0, 34, 24)));
            animationFrames.push(cc.SpriteFrame(res.yellowbird_midflap, cc.rect(0, 0, 34, 24)));
        }
        else{

            animationFrames.push(cc.SpriteFrame(res.redbird_upflap, cc.rect(0, 0, 34, 24)));
            animationFrames.push(cc.SpriteFrame(res.redbird_midflap, cc.rect(0, 0, 34, 24)));
            animationFrames.push(cc.SpriteFrame(res.redbird_downflap, cc.rect(0, 0, 34, 24)));
            animationFrames.push(cc.SpriteFrame(res.redbird_midflap, cc.rect(0, 0, 34, 24)));
        }
        //cc.log(aniFrames);
        var animation = cc.Animation(animationFrames, 0.1);
        var actiontoRepeat = cc.Animate(animation);
        this.actions.animation = cc.RepeatForever.create(actiontoRepeat);
        this.runAction(this.actions.animation);
    },

    waitingTap : function() {

        var seq = cc.sequence(
            cc.moveBy(0.4, 0, 10),
            cc.moveBy(0.4, 0, -10)
        );

        this.actions.waiting = cc.repeatForever(seq);
        this.runAction(this.actions.waiting);
    },

    fall: function(dt){
        this.y -= this.speed * dt;
        this.speed += this.gravity * dt;
        if(this.speed > this.limitSpeed)
            this.speed = this.limitSpeed;
    },

    fly: function() {
        this.speed = -this.jumpForce;
    }

});