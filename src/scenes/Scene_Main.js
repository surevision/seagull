var Scene_Main = cc.Scene.extend({
	bg : null,
	spriteHm : null,
	hm : null,
	bullets : [],
	birds : [],
	shits : [],
	controlLayer : null,
	cntLabel : null,
	birdHitCnt : 0,
	gameoverLabel : null,
	gameoverLayer : null,
	timeCnt : 0,
    onEnter:function () {
        this._super();
        this.controlLayer = new ccui.Layout();
        this.controlLayer.setContentSize(cc.winSize);
        this.controlLayer.setTouchEnabled(true);
        this.controlLayer.addTouchEventListener(this.onTouchMove, this)

		//this.controlLayer.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
		//this.controlLayer.setBackGroundColor(cc.color(128, 128, 128));
		this.addChild(this.controlLayer, 999)

		this.gameoverLabel = new ccui.Text();
		this.gameoverLabel.setFontSize(36);
		this.gameoverLabel.setString("GAME_OVER");
		this.gameoverLabel.setPositionX(cc.winSize.width / 2);
		this.gameoverLabel.setPositionY(cc.winSize.height * 3 / 4);
		this.gameoverLabel.setVisible(false);
		this.addChild(this.gameoverLabel, 1000);

        this.gameoverLayer = new ccui.Layout();
        this.gameoverLayer.setContentSize(cc.winSize.width, cc.winSize.height / 2);
        this.gameoverLayer.setPositionY(cc.winSize.height / 2);
        this.gameoverLayer.setTouchEnabled(false);
        this.gameoverLayer.addTouchEventListener(this.restart, this)
		this.addChild(this.gameoverLayer, 1000);

		this.cntLabel = new ccui.Text();
		this.cntLabel.setFontSize(36);
		this.cntLabel.setString("" + this.birdHitCnt);
		this.cntLabel.setPositionX(cc.winSize.width / 8);
		this.cntLabel.setPositionY(cc.winSize.height - this.cntLabel.getContentSize().height);
		this.addChild(this.cntLabel, 10);

        this.bg = new Sprite_Bg();

        this.addChild(this.bg, 1);

        this.hm = new Game_Human(cc.winSize.width / 2 - 25, 52, cc.winSize.width);
        this.spriteHm = new Sprite_Human(this.hm);
        this.addChild(this.spriteHm, 2);

        this.schedule(this.update);
        cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed : this.onKeyMove
        }, this);
    },
    restart : function(sender, type) {	
    	if (type == ccui.Widget.TOUCH_ENDED) {  	
            this.clear();
    	}
    },
    clear : function() {
    	this.hm.die = false;
    	//this.spriteHm.setPositionX(cc.winSize.width / 2 - 25);
    	this.controlLayer.setTouchEnabled(true);    
    	this.gameoverLayer.setTouchEnabled(false);
    	this.gameoverLabel.setVisible(false);
    	this.birdHitCnt = 0;
		this.cntLabel.setString("" + this.birdHitCnt);
    	for (var i = 0; i < this.birds.length; i += 1) {
    		if (this.birds[i] == null){continue;}
    		this.birds[i].removeFromParent();
    		this.birds[i] = null;
    	}
    	this.birds = [];
    	for (var i = 0; i < this.shits.length; i += 1) {
    		if (this.shits[i] == null){continue;}
    		this.shits[i].removeFromParent();
    		this.shits[i] = null;
    	}
    	this.shits = [];
    	for (var i = 0; i < this.bullets.length; i += 1) {
    		if (this.bullets[i] == null){continue;}
    		this.bullets[i].removeFromParent();
    		this.bullets[i] = null;
    	}
    	this.bullets = [];
        this.schedule(this.update);

    },
    onKeyMove : function(key, event) {
    	var tar = event.getCurrentTarget();
    	if (tar.hm.die) {
    		return;
    	}
		if (key == 37) {
			// left
            tar.hm.moveLeft();
		} else if (key == 39) {
			// right
            tar.hm.moveRight();
		}
    },
    onTouchMove : function(sender, type) {
    	// console.log("touch");
    	if (type == ccui.Widget.TOUCH_BEGAN) {    		
            var x = sender.convertToNodeSpace(sender.getTouchBeganPosition()).x;
            if (x < cc.winSize.width / 2) {
            	this.hm.moveLeft();
            } else {
            	this.hm.moveRight();
            }
    	}
    },
    geneBird : function() {
    	var speed = parseInt(Math.random() * 5) + 1;
    	speed *= (Math.random() * 100 > 60) ? 1 : -1;
    	var y = Math.random() * 30 + 400;
    	var bird = new Game_Bird(speed, y, cc.winSize.width);
    	var spriteBird = new Sprite_Bird(bird);
    	var pushFlag = true;
    	for (var i = 0; i < this.birds.length; i += 1) {
    		if (this.birds[i] == null) {
    			this.birds[i] = spriteBird;
    			pushFlag = false;
    			break;
    		} 
    	}
    	if (pushFlag) {
    		this.birds.push(spriteBird);
    	}
    	cc.director.getRunningScene().addChild(spriteBird, 4);
    },
    update : function(dt) {
    	this.timeCnt += 1;
    	if (this.timeCnt >= 100) {
    		this.timeCnt %= 100;
    		this.geneBird();	// 创建鸟
    	}
    	this.spriteHm.update(this.bullets);
    	for (var i = 0; i < this.birds.length; i += 1) {
    		if (this.birds[i] == null){continue;}
    		this.birds[i].update(this.shits);
    	}
    	for (var i = 0; i < this.shits.length; i += 1) {
    		if (this.shits[i] == null){continue;}
    		if (this.shits[i].update(this.hm)) {	// 撞到人或出界
    			if (this.hm.die) {
    				break;
    			}
    			this.shits[i] = null;
    		}
    	}
    	for (var i = 0; i < this.bullets.length; i += 1) {
    		if (this.bullets[i] == null){continue;}
    		if (this.bullets[i].update(this.birds, this)) {	// 出界
    			this.bullets[i] = null;
    		}
    	}
    	this.bg.update();
    	if (this.hm.die) {
    		console.log("die");
    		this.unschedule(this.update);
    		this.gameoverLabel.setVisible(true);
    		this.controlLayer.setTouchEnabled(false);
    		this.gameoverLayer.setTouchEnabled(true);
    		//cc.director.pause();
    	}
    }
});