var Scrollo ={};


Scrollo.Boot = function(game) {};
Scrollo.Boot.prototype = {
	preload: function() {
        this.load.image('preload','images/load bar.png');
    },
    
    
    create: function() {
        this.stage.disableVisibilityChange = false; // pause game on tab change
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 640;
        this.scale.minHeight = 480;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        //this.stage.forcePortrait = true;  // force portrait mode; 
        //this.scale.refresh()// true will force screen resize no    matter what needed to fix this myself
        this.stage.backgroundColor = '#770515';
        this.state.start('Preloader')
    }
	
};
