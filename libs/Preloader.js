

Scrollo.Preloader = function(game) {
    this.preloader =null;
    this.titleText = null;
    this.ready=false;
    
    
};

Scrollo.Preloader.prototype = {
    
	
	preload: function () {
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preload');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);
        //backgrounds
        this.load.image('titlescreen','images/StartBack.png');
        this.load.image('bgtile','images/PrimaryBackground.png');
        //characters
        this.load.image('char1','images/char1.png')
        //enemies
        this.load.image('enemy1','images/enemy1.png')
        this.load.image('enemy2','images/enemy2.png')        
        this.load.image('bullets','images/bullet1.png')
        this.load.image('bullet2','images/bullet2.png')
        this.load.image('boss','images/boss.png')
        this.load.image('cloud','images/cloudPlatform.png')
        this.load.image('invisPlat','images/bottomPlat.png')
        
        this.load.audio('enemydead',['sound/enemydeath.wav']);
        this.load.audio('playerdead',['sound/die.wav']);//soundby dklon https://opengameart.org/content/platformer-jumping-sounds
        this.load.audio('jump',['sound/jump.wav']);//sound by dklon https://opengameart.org/content/platformer-jumping-sounds
        this.load.audio('music',['sound/music.mp3']);//music is from the game dustforce

        this.game.time.advancedTiming = true;
	},

	create: function () {
		this.preloadBar.cropEnabled = false; //force show the whole thing

    
	},

	update: function () {
        //if(this.cache.isSoundDecoded('game_audio')&& this.ready == false){
            this.ready = true;
            this.state.start('StartMenu');
    },
};    