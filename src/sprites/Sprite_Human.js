var Sprite_Human = Sprite_Base.extend({
	ctor : function(hm) {
		this._super(res.hm);
		this.hm = hm;
		this.hm.initWidth(this.getContentSize().width);
		this.hm.initHeight(this.getContentSize().height);
        this.setPositionY(hm.y);
	},
	update : function(bullets) {
		this.setPositionX(this.hm.x);
		if (this.hm.update()) {
			var bullet = new Game_Bullet(this.hm.x + this.hm.width / 2 - 5, this.hm.y, 5, cc.winSize.height);
			var spriteBullet = new Sprite_Bullet(bullet);
			var pushFlag = true;
			for (var i = 0; i < bullets.length; i += 1) {
				if (bullets[i] == null) {
					bullets[i] = spriteBullet;
					pushFlag = false;
					break;
				}
			}
			if (pushFlag) {
				bullets.push(spriteBullet);
			}
			cc.director.getRunningScene().addChild(spriteBullet, 4);
		}
	}
})