var Sprite_Bullet = Sprite_Base.extend({
	bullet : null,
	ctor : function(bullet) {
		this._super(res.bullet);
		this.bullet = bullet;
		this.setPositionX(bullet.x);
	},
	update : function(birds, sceneMain) {
		var result = this.bullet.update();	// 出界
		if (result) {
			this.removeFromParent();
		} else {
			this.setPositionY(this.bullet.y);
			for (var i = 0; i < birds.length; i += 1) {
    			if (birds[i] == null){continue;}
				if (this.bullet.hit(birds[i])) {
					birds[i].removeFromParent();
					birds[i] = null;
					sceneMain.birdHitCnt += 1;
					sceneMain.cntLabel.setString("" + sceneMain.birdHitCnt);
				}
			}
		}
		return result;
	}
});