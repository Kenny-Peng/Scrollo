//constants
var overString = '';
var score = 0;
var scoreText;
var gameOverText;
var sprite;
var weapon;
var cursors;
var fireButton;
var health=5;
var bulletDamage=1;
var group;
var platform1;
var highScore = '0';


Scrollo.Stage1 = function(game){
    this.background = null;
    this.foreground = null;
};



Scrollo.Stage1.prototype = {
    
    //initialization
    init: function(){
        this.game.renderer.renderSession.roundPixels = true;
        this.physics.startSystem(Phaser.Physics.Arcade)
    },
    
    create:function(){

        //graphics
        this.game.renderer.renderSession.roundPixels = true;
        bgtile = this.add.tileSprite(0, 0, this.world.width, this.game.cache.getImage('bgtile').height, 'bgtile');
        
        //platform rects
        /*var platformbmd = this.add.bitmapData(80, 16);
        platformbmd.ctx.rect(0, 0, 80, 16);
        platformbmd.ctx.fillStyle = "#000000";
        platformbmd.ctx.fill();   */ 
        //sound
        //music
        music = this.add.audio('music');
        music.play();
        
        this.playerDead = this.add.audio('playerdead');
        this.playerJump = this.add.audio('jump');
        this.enemyDead= this.add.audio('enemydead');
        
        
        //controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

        
        //score
        scoreString = 'Score: ';
        highScoreString = 'Highscore:'
        scoreText = this.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });
        highscoreText = this.add.text(10, 50, highScoreString + highScore, { font: '34px Arial', fill: '#fff' });
        
        overString ='   Game Over\nWait to Restart\n Final Score : '
        

        

        //enemies
        //boss place holder
        this.stop = false;
        //groups
        this.enemies = this.game.add.group();
        this.physics.arcade.enable(this.enemies);
        this.enemies.enableBody = true;
        this.enemies.createMultiple(50,'enemy1');


        //spawn
        this.game.time.events.loop(this.rnd.integerInRange(1000, 2000),this.addEnemy1,this);            
        
        this.game.time.events.loop(this.rnd.integerInRange(3000, 7000),this.addEnemy2,this);      
        
        //player
        this.player = this.add.sprite(640, 930,'char1');
        this.player.anchor.setTo(0.5,0.5);
        this.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        this.player.body.gravity.y = 1200;
        this.player.body.collideWorldBounds = true;  
        this.player.body.moves = true;
        
        
        
        //platforms
        this.group = this.game.add.group();
        this.group.enableBody = true;
        
        this.platformBottom = this.add.sprite(this.game.world.centerX,960,'invisPlat');
        this.physics.arcade.enable(this.platformBottom);
        this.platformBottom.enableBody = true;
        this.platformBottom.alpha =0;
        this.platformBottom.scale.x = this.game.world.width;
        this.platformBottom.body.moves = false;
        this.platformBottom.anchor.set(0.5);
        this.platformBottom.body.immovable = true;
        this.platformBottom.body.allowGravity = false;
        this.platformBottom.body.velocity.x = 0;
        this.platformBottom.body.collideWorldBounds = true; 
        
        this.platform1 = this.game.add.sprite(this.game.world.centerX - 200, this.game.world.centerY + 164, 'cloud', 0, this.group);
        this.platform1.body.moves = true;
        this.platform1.anchor.set(0.5);
        this.platform1.body.immovable = true;
        this.platform1.body.checkCollision.down = false;
        this.platform1.body.allowGravity = false;
        this.platform1.body.bounce.set(1);
        this.platform1.body.velocity.x = -100;
        this.platform1.body.collideWorldBounds = true;
        
        this.platform2 = this.game.add.sprite(this.game.world.centerX + 200, this.game.world.centerY -50, 'cloud', 0, this.group);
        this.platform2.body.moves = true;
        this.platform2.anchor.set(0.5);
        this.platform2.body.immovable = true;
        this.platform2.body.checkCollision.down = false;
        this.platform2.body.allowGravity = false;
        this.platform2.body.bounce.set(1);
        this.platform2.body.velocity.x = 100;
        this.platform2.body.collideWorldBounds = true;  
        
        this.platform3 = this.game.add.sprite(this.game.world.centerX + 400, this.game.world.centerY -300, 'cloud', 0, this.group);
        this.platform3.body.moves = true;
        this.platform3.anchor.set(0.5);
        this.platform3.body.immovable = true;
        this.platform3.body.checkCollision.down = false;
        this.platform3.body.allowGravity = false;
        this.platform3.body.bounce.set(1);
        this.platform3.body.velocity.x = 100;
        this.platform3.body.collideWorldBounds = true;          
        
        
        
        
        
        weapon = this.add.weapon(50, 'bullets');

        //  The bullet will be automatically killed when it leaves the world bounds
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

        //  Because our bullet is drawn facing up, we need to offset its rotation:
        weapon.bulletAngleOffset = 0;
        
        weapon.fireAngle = 0;

        //  The speed at which the bullet is fired
        weapon.bulletSpeed = 1000;
        
        weapon.trackSprite(this.player, 0, 0);
        //autofire off
        weapon.autofire = false;
        //firerate
        weapon.fireRate = 100;
        //body
        weapon.resumeAll();
        
        //controls

        cursors = this.input.keyboard.createCursorKeys();

        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        
        //weapon for enemeis
        weapon2= this.add.weapon(50,'bullet2');
         //  The bullet will be automatically killed when it leaves the world bounds
        weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

        //  Because our bullet is drawn facing up, we need to offset its rotation:
        weapon2.bulletAngleOffset = 90;
        
        weapon2.fireAngle = 0;

        //  The speed at which the bullet is fired
        weapon2.bulletSpeed = 200;
        
        weapon2.trackSprite(this.player, 0, 0);
        //autofire off
        //weapon2.autofire = true;
        //firerate
        weapon2.fireRate = 2000;
        //body
        weapon2.resumeAll();
        //weapon2.x=this.enemies.worldPosition.x;
        
    },
    increment:function(){
        i = i + 10;
    },

    addBoss:function(){

        if(this.bossHere == true&&this.stop == false){
            this.go = true;
        }
        this.spawnBoss();

    },
    spawnBoss:function(){
        if(this.go==true){
            this.boss = this.add.sprite(1000, 900,'boss');
            this.boss.health = 200;
            this.boss.anchor.setTo(0.5,0.5);
            this.physics.arcade.enable(this.boss);
            this.boss.enableBody = true;
            this.boss.body.gravity.y = 0;
            this.boss.body.collideWorldBounds = true;  
            this.boss.body.moves = true;
            this.boss.body.bounce.set(1.2);
            i = 1;
            var interval = setInterval(this.increment, 1000);
            this.bossY = interval;
            this.bossX = interval;
            this.boss.body.velocity.x= -200+this.bossX;
            this.boss.body.velocity.y= -300+this.bossY;   
            this.go = false;
            this.stop = true;
        }
    },
    
    addEnemy1: function (){
        var enemy1 = this.enemies.getFirstDead();
        if(!enemy1){
            return;   
        }
        enemy1.body.gravity.y =0;
        enemy1.anchor.setTo(.5,.5);
        enemy1.reset(1230,940,3);
        enemy1.body.velocity.y = 0;
        enemy1.body.velocity.x = this.randownSpeed(); //* this.game.rnd.pick([-1,1]);
        enemy1.checkWorldBounds = true;
        enemy1.outOfBoundsKill = true;

    },
    
    addEnemy2: function (){
        var enemy2 = this.enemies.getFirstDead();
        if(!enemy2){
            return;   
        }
        enemy2.loadTexture('enemy2');
        enemy2.physicsBodyType = Phaser.Physics.ARCADE;
        enemy2.body.gravity.y = this.rnd.integerInRange(500, 1000);
        enemy2.anchor.setTo(.5,.5);
        enemy2.reset(1230,this.rnd.integerInRange(200, 960),1);
        enemy2.body.velocity.y = -200;
        enemy2.body.velocity.x = this.rnd.integerInRange(-100, -500); //* this.game.rnd.pick([-1,1]);
        enemy2.checkWorldBounds = true;
        enemy2.outOfBoundsKill = true;
        enemy2.body.bounce.set(1.2);

    },        
    
    randownSpeed: function(min, max) {
        
        return this.rnd.integerInRange(-10, -1000)
        /*min = Math.ceil(-100);
        max = Math.floor(-1000);
        return Math.floor(Math.random() * (max - min)) + min;*/
    },
    
    playerInputs:function(player){
        
        //horizontal
        if(this.cursors.left.isDown){
            this.player.body.velocity.x = -300;  
            weapon.fireAngle = 180;
        }
        else if(this.cursors.right.isDown){
            this.player.body.velocity.x = 300;
            weapon.fireAngle = 0;  
        }
        else{
            this.player.body.velocity.x = 0;
        }        
        //vertical
        if(this.cursors.up.isDown && this.player.body.velocity.y ==0){
            this.player.body.velocity.y = -600;
            this.playerJump.play();
        }        
        if(this.cursors.down.isDown){
        }
        
        if (fireButton.isDown&&this.player.alive)
            {
            weapon.fire();
            }

    },
    
    
    
    
    collisions:function(){
      //player with objects
        this.physics.arcade.overlap(this.player,this.enemies,this.gameOver,null,this);  
        this.physics.arcade.collide(this.platformBottom,this.enemies); 
        this.physics.arcade.collide(this.player,this.group); 
        this.physics.arcade.overlap(this.player,this.boss,this.gameOver,null,this); 
        this.physics.arcade.overlap(weapon.bullets, this.enemies,this.hitEnemy,null,this);    
        this.physics.arcade.overlap(weapon.bullets, this.boss,this.hitBoss,null,this);    
                          
    },
    
    gameOver:function(){
        this.player.kill();
        if(this.enemies.exists){
            this.enemies.destroy();
        }
        this.playerDead.play();
        this.camera.shake(0.2,500);
        gameOverText = this.add.text(this.game.width/2-100, this.game.height/2, overString + score, { font: '34px Arial', fill: '#000000' });
        gameOverText.lineSpacing = 20;
        
        if(highScore<score){
            highScore = score;
        }
        
        score = 0;
        music.stop();
        //go to menu
        this.time.events.add(5000,this.startMenu,this);
        
    },    
    
     startMenu:function() {
        this.state.start('StartMenu');
    },    
    
    screenAdvancement:function(){
        bgtile.tilePosition.x+=1;
    },
    
    hitEnemy:function(bullet,enemy){
        bullet.kill();
        this.enemyDamaged(enemy,bulletDamage);    
    },
    
    enemyDamaged:function(enemy,damage){
      enemy.damage(damage);  
        if (!enemy.alive){
            this.enemyDead.play();
            score += 100;
            scoreText.text = scoreString + score;
        }
        else{
            score +=50
            scoreText.text = scoreString + score;            
        }
            
    },    
    hitBoss:function(bullet,boss){ 
        //bullet.kill();
        this.bossDamaged(this.boss,bulletDamage);   
        console.log(this.boss.health);
    },
    
    bossDamaged:function(boss,damage){
        boss.damage(damage);  
        if (!this.boss.alive){
            this.enemyDead.play();
            score += 100000;
            scoreText.text = scoreString + score;
        }
        else{
            score +=50
            scoreText.text = scoreString + score;            
        }      
            
    },    
    


    update:function(){

        this.collisions();
        //controls
        if(score >=5000){
            this.bossHere = true;    
        }
        else if(score<5000){
            this.bossHere = false;
        }

        this.playerInputs();
        this.screenAdvancement();
        this.addBoss();
        
    },
    
}