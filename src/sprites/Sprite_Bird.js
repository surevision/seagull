var Sprite_Bird = Sprite_Base.extend({
	bird : null,
	ctor : function(bird) {
		this._super(res.bird);
		this.bird = bird;
		this.bird.initWidth(this.getContentSize().width);
		this.bird.initHeight(this.getContentSize().height);
		if (this.bird.speed <= 0) {	// 反向
			this.setScaleX(-this.getScaleX());
		}
	},
	update : function(shits) {
		var result = this.bird.update();
		this.setPositionY(this.bird.y);
		this.setPositionX(this.bird.x);
		if (result) {
			var shit = new Game_Shit(this.bird.x, this.bird.y, 2);
			var spriteShit = new Sprite_Shit(shit);
			var pushFlag = true;
			for (var i = 0; i < shits.length; i += 1) {
				if (shits[i] == null) {
					shits[i] = spriteShit;
					pushFlag = false;
					break;
				}
			}
			if (pushFlag) {
				shits.push(spriteShit);
			}
			cc.director.getRunningScene().addChild(spriteShit, 3);
		}
		return result;
	}
});