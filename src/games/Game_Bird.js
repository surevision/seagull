var Game_Bird = function(speed, y, max_x) {
	this.speed = speed;
	this.y = y;
	this.x = 0;
	this.max_x = max_x;
	this.width = 0;
	this.height = 0;
	this.timeCnt = 0;
	this.step = parseInt(Math.random() * 50) + 60;	// 产屎
};

Game_Bird.prototype = {
	initWidth : function(width) {
		this.width = width;
	},
	initHeight : function(height) {
		this.height = height;
	},
	update : function() {	// 生产bird屎这种事居然不是bird做的← ←，而且居然是鸟的精灵做的，鸟的精灵哟← ←
		this.x += this.speed;
		if (this.x <= -this.width) {
			this.x = this.max_x;
		} else if (this.x >= this.max_x) {
			this.x = -this.width;
		}
		this.timeCnt += 1;
		if (this.timeCnt >= this.step) {
			this.timeCnt = 0;
			return true;
		}
		return false;
	}
};