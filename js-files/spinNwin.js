let config={
	type:Phaser.CANVAS,
	width:700,
	height:700,
	scene:{
		preload:preload,
		create:create,
		update:update,
		backgroundColor:0xffcc00,
	}
};
let prizes={
	count:12,
	prizes_names:["CB Tshirt","2 extra spin","Amazon Voucher","50% off","Netflix subs.","100% off",
	"CB SwagPack","70% off","Hard Luck","35% off","3000 CB points","CB book"],
};
let game=new Phaser.Game(config);
function preload()
{
	this.load.image('wheel','Assets/wheel.png');
	this.load.image('pin','Assets/pin.png');
	this.load.image('stand','Assets/stand.png');
	this.load.image('background','Assets/back.jpg');
}
function create(){
	W=700;
	H=700;
	this.wheel = this.add.sprite(W/2,H/2,'wheel');
	this.wheel.setScale(0.25);

	let pin = this.add.sprite(W/2,85,'pin');
	pin.setScale(0.20);
	
	let stand = this.add.sprite(W/2,H-85,'stand');
	stand.setScale(0.20);
	stand.depth=-1;

	this.background = this.add.sprite(W/2,H/2,'background');
	this.background.depth=-2;
	this.background.setScale(0.30);

	font_style={
		font: "bold 30px Arial",
		color: "red",
		align:"center",
	};
	this.game_text=this.add.text(10,10,"Spin and Win!",font_style);
	this.input.on("pointerdown",spinwheel,this);
}
function spinwheel(){
	let rounds=Phaser.Math.Between(2,5);
	let id=Phaser.Math.Between(1,12);
	let angle=((360*rounds)+(30*id));
	this.spinning=true;
	tween = this.tweens.add({
		targets:this.wheel,
		angle:angle,
		ease:"Cubic.easeOut",
		duration:6000,
		callbackScope:this,
		onComplete:function(){
			this.game_text.setText("You Won : "+prizes.prizes_names[id-1]);
		},
	});
}
function update(){
	this.background.angle+=0.1;
}