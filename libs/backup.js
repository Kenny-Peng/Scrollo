//constants
var overString = '';
var score = 0;
var scoreText;
var gameOverText;


Scrollo.Stage1 = function(game){
    this.background = null;
    this.foreground = null;
};



Scrollo.Stage1.prototype = {
    
    create:function(){

        
        //graphics
        this.game.renderer.renderSession.roundPixels = true;
        bgtile = this.add.tileSprite(0, 0, this.world.width, this.game.cache.getImage('bgtile').height, 'bgtile');
        
        //phyiscs
        
        //controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);    
        
        //score

        scoreString = 'Score : ';
        scoreText = this.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });
        overstring ='Final Score : '
        
        //player
        this.player = this.add.sprite(640, 930,'char1');
        this.player.anchor.setTo(0.5,0.5);
        this.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        this.player.body.gravity.y = 1200;
        this.player.body.collideWorldBounds = true;        
        
        //hitboxes for melee
        hitboxes = this.game.add.group();     // give all the hitboxes a physics body (I'm using arcade physics btw)     
        hitboxes.enableBody = true;     // make the hitboxes children of the player. They will now move with the player     
        this.player.addChild(hitboxes);     // create a "hitbox" (really just an empty sprite with a physics body)     
        var hitbox1 = hitboxes.create(0,0,null);     // set the size of the hitbox, and its position relative to the player     
        hitbox1.body.setSize(50, 50, this.player.width, this.player.height / 2);     // add some properties to the hitbox. These can be accessed later for use in calculations     
        hitbox1.name = "punch";     
        hitbox1.damage = 50;     
        hitbox1.knockbackDirection = 0.5;    
        hitbox1.knockbackAmt = 600;// activate a hitbox by 
        
        //enemies
        //groups
        this.enemies = this.game.add.group();
        this.physics.arcade.enable(this.enemies);
        this.enemies.enableBody = true;
        this.enemies.createMultiple(10,'enemy1');
        this.enemies.setAll('body.immovable',true);
        //spawn
        this.game.time.events.loop(2200,this.addEnemy1,this);            
        
        
        

    },
    
    melee:function(hitboxName) {     // search all the hitboxes     
        for(var i = 0; i < hitboxes.children.length; i++){          // if we find the hitbox with the "name" specified          
            if(hitboxes.children[i].name === hitboxName){               // reset it               
                hitboxes.children[i].reset(0,0);} }},// disable all active 
    
    disableAllHitboxes:function(){
        hitboxes.forEachExists(function(hitbox){
         hitbox.kill();});},    
    
    
    addEnemy1: function (){
        var enemy1 = this.enemies.getFirstDead();
        if(!enemy1){
            return;   
        }
        enemy1.body.gravity.y =0;
        enemy1.anchor.setTo(.5,.5);
        enemy1.reset(1230,940);
        enemy1.body.velocity.y = 0;
        enemy1.body.velocity.x = this.randownSpeed(); //* this.game.rnd.pick([-1,1]);
        enemy1.checkWorldBounds = true;
        enemy1.outOfBoundsKill = true;
        enemy1.health = 5;
    },    
    
    randownSpeed: function(min, max) {
        min = Math.ceil(-100);
        max = Math.floor(-1000);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    
    playerInputs:function(player){
        //horizontal
        if(this.cursors.left.isDown){
            this.player.body.velocity.x = -300;    
        }
        else if(this.cursors.right.isDown){
            this.player.body.velocity.x = 300;
        }
        else{
            this.player.body.velocity.x = 0;
        }        
        //vertical
        if(this.cursors.up.isDown && this.player.body.velocity.y ==0){
            this.player.body.velocity.y = -600;
        }        

    },
    
    collisions:function(){
      //player with objects
        this.physics.arcade.overlap(this.player,this.enemies,this.gameOver,null,this);  
                          
                          
    },
    
    gameOver:function(){
        this.player.kill();
        this.camera.shake(0.2,500);
        Gameovertext = this.add.text(this.game.width/2-100, this.game.height/2, overString + score, { font: '34px Arial', fill: '#fff' });
        score = 0;
        //go to menu
        this.time.events.add(5000,this.startMenu,this);
        
    },    
    
    screenAdvancement:function(){
        bgtile.tilePosition.x+=1;
    },
    
    update:function(){
        this.screenAdvancement();
        this.collisions();
        //controls
        this.playerInputs();

        
    },
    
    render:function(){
        //this.game.debug.body(hitbox1);            
    },
}