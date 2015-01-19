var Game_Bullet = function(x, y, speed, max_y) {
	this.x = x;
	this.y = y;
	this.max_y = max_y;
	this.speed = speed;
};

Game_Bullet.prototype = {	
	hit : function(bird) {
		return this.x >= bird.x &&
			this.x <= bird.x + bird.width &&
			this.y <= bird.y + bird.height &&
			this.y >= bird.y;
	},
	update : function() {
		this.y += this.speed;
		if (this.y > this.max_y) {
			return true;
		}
		return false;
	}
};