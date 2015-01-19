var Game_Shit = function(x, y, speed) {
	this.x = x;
	this.y = y;
	this.speed = speed || 10;
};

Game_Shit.prototype = {
	hit : function(hm) {
		return this.x >= hm.x + 10 &&
			this.x <= hm.x + hm.width - 10 &&
			this.y <= hm.y + hm.height &&
			this.y >= hm.y;
	},
	update : function(height) {
		this.y -= this.speed;
		if (this.y <= -height) {
			return true;
		}
		return false;
	}
};