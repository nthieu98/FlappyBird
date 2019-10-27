/**
 * Created by hieun on 10/26/2019.
 */
var Pipe = cc.Sprite.extend({

    bird : null,
    _pipe: null,
    lower: null,

    ctor : function (lower) {
        this.lower = lower;
        this._super(res.pipe_green, cc.rect(0, 0, 52, 320));
        if(lower != null){
            this.attr({
                anchorX: 0,
                anchorY: 0,
                x: lower.x,
                y: lower.y + 450
            });
            this.setFlippedY(true);
        }
        else{
            this.attr({
                anchorX: 0,
                anchorY: 0,
                x: winSize.width,
                y: Math.floor(cc.rand() % (winSize.height/4))
            });
        }
        this.scheduleUpdate();
        this.scheduleUpdate()
    },

    update : function (dt) {
        this.x -= 100 * dt;

        if(this.parent.gameover == true){
            this.unscheduleUpdate();
        }

        if(this.parent.checkCollision(this, this.parent._bird)){
           //cc.log("collision");
            this.parent.gameOver();
            this.unscheduleUpdate();
        }
        if(this.parent.checkAcross(this, this.parent._bird)){
            if(this.lower != null){
                this.parent.score += 1;
            }
            this.unscheduleUpdate();
            this.end();
        }

        //cc.log(this.x);
    },
    end : function() {
        this.runAction(cc.moveBy (3.5, -winSize.width / 2 - 100, 0));
    }

});