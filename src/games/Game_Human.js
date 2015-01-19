var Game_Human = function(x, y, max_x) {
	this.x = x;
	this.y = y;
	this.max_x = max_x;
	this.width = 0;
	this.height = 0;

	this.speed = 10;
	this.timeCnt = 0;
	this.step = 30;
	this.die = false;
};

Game_Human.prototype = {
	initWidth : function(width) {
		this.width = width;
	},
	initHeight : function(height) {
		this.height = height;
	},
	moveLeft : function() {
		this.x -= this.speed;
		if (this.x <= -this.width) {
			this.x = this.max_x;
		}
	},
	moveRight : function() {
		this.x += this.speed;
		if (this.x >= this.max_x) {
			this.x = 0;
		}
	},
	update : function() {
		this.timeCnt += 1;
		if (this.timeCnt >= this.step) {
			this.timeCnt = 0;
			return true;
		}
		return false;
	}
};