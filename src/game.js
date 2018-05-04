let gameScene = new Phaser.Scene('Game');
let config ={
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene,
    physics:{
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};
let game=new Phaser.Game(config);

var player;
var dragons;
var playerSpeed=4;
var gameOverText;
var playAgain;
var treasure;

gameScene.init = function(){

}
gameScene.preload = function(){
   this.load.image('player','assets/player.png')
   this.load.image('background','assets/backgroundv1.png');
   this.load.image('dragon','assets/dragon.png')
   this.load.image('treasure','assets/treasure.png')
}
gameScene.create = function(){
    let background = this.add.image(0,0,'background');
    background.setOrigin(0,0);
    this.physics.world.setBounds(0,0,2240,1260)
    player = this.physics.add.sprite(20,this.sys.canvas.height/2,'player')
    player.setScale(0.5)
    player.setCollideWorldBounds(true)
    dragons=this.physics.add.group({
        key:'dragon',
        repeat: 5,
        setXY: {x:100,y:10,stepX:300}
    })
    dragons.children.iterate((dragon)=>{
        dragon.setVelocity(0,Phaser.Math.FloatBetween(50,300));
        
        dragon.setCollideWorldBounds(true)
        dragon.setBounce(1)
        
    })
    treasure=this.physics.add.sprite(Phaser.Math.Between(200,2100),Phaser.Math.Between(100,1100),'treasure')
    this.physics.add.overlap(player,treasure,(player,treasure)=>{
        treasure.disableBody(true,true)
        player.disableBody(true)
        dragons.children.iterate((dragon)=>{
            dragon.setVelocity(0,0)
        })
        let x = this.cameras.main.scrollX;
        let y = this.cameras.main.scrollY;
        gameOverText= this.add.text(x,y,"You Win!!",{fontSize:'32px'})
        playAgain=this.add.text(x,y+50,"Press space to play again",{fontSize: '20px'})
        this.cameras.main.shake(250);
    })
    this.physics.add.overlap(dragons,player,(player,dragon)=>{
        
        //player.active=false
        player.disableBody(true)
        dragons.children.iterate((dragon)=>{
            dragon.setVelocity(0,0)
        })
        let x = this.cameras.main.scrollX;
        let y = this.cameras.main.scrollY;
        gameOverText= this.add.text(x,y,"Game Over",{fontSize:'32px'})
        playAgain=this.add.text(x,y+50,"Press space to play again",{fontSize: '20px'});
        this.cameras.main.shake(250);
        
        //console.log("toast")
    },null,this)

   
    //this.cameras.main.setSize(640,360);
    //this.cameras.main.setZoom(2)
    this.cameras.main.setBounds(0,0,2240,1260)
    
    this.cameras.main.startFollow(player);
    
    
}

gameScene.update = function () {
    let keys = this.input.keyboard.createCursorKeys();
    let restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    
    if(restart.isDown){
        this.scene.start(this)
    }
    if(player.active){if (keys.down.isDown && player.y<=1260) {
        
        player.y += playerSpeed;
    }
    if (keys.up.isDown && player.y>=0) {
        
        player.y -= playerSpeed;
    }
    if (keys.right.isDown && player.x<=2240) {
        player.setFlipX(false)
        player.x += playerSpeed;
    }
    if (keys.left.isDown && player.x>=0) {
        player.setFlipX(true);
        player.x -= playerSpeed;
    }}
    
    
}
