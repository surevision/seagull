var Sprite_Shit = Sprite_Base.extend({
	shit : null,
	ctor : function(shit) {
		this._super(res.shit);
		this.shit = shit;
		this.setPositionX(this.shit.x);
	},
	update : function(human) {
		var result = this.shit.update();
		if (result) {
			this.removeFromParent();
		} else {			
			this.setPositionY(this.shit.y);
			if (this.shit.hit(human)) {
				human.die = true;
				result = true;
			}
		}
		return result;
	}
});