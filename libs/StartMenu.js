var startText = null;
Scrollo.StartMenu = function(game) {
    this.startBack;
    this.startPrompt
}
Scrollo.StartMenu.prototype = {
    
	create: function () {


        //background
        startBack = this.add.image(0,0,'titlescreen');
        startBack.inputEnabled = true;

        //arrows
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //add keys
        this.spaceBar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        //startText = this.add.text(this.game.width/2, this.game.height/2, 'Press Space to Start',{ font: '34px Arial', fill: '#fff' });
        //startText.anchor.setTo (0.5,0.5);
        
        startText2 = this.add.text(this.game.width/2+5, this.game.height/2+50, 'Press Space to Start \nArrow Keys to Move\n Up Arrow to jump/fly\n Spacebar to Shoot',{ font: '34px Arial', fill: '#fff' });
        startText2.anchor.setTo (0.5,0.5);
        startText2.lineSpacing = 20;
        
        startText3 = this.add.text(this.game.width/2, this.game.height/2-150, 'The Game v2',{ font: '34px Arial', fill: '#fff' });
        startText3.anchor.setTo (0.5,0.5);
        
	},
    
    update: function(){
        if (this.spaceBar.isDown){
            this.state.start('Stage1')
        }
            
    },
};