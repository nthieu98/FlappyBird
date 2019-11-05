/**
 * Created by hieun on 10/28/2019.
 */

var Score = cc.Sprite.extend({
    ctor: function(){
        this._super;
        this.init();

        this.scheduleUpdate();
    },
    update: function () {
        this.show(this.parent.score);
    },
    show: function() {

    }
});