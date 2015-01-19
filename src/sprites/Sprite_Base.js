var Sprite_Base = ccui.ImageView.extend({
	ctor : function(filename) {
		this._super();
		this.loadTexture(filename);
		this.setAnchorPoint(0, 0);
	}
});