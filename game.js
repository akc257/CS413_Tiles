var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 400 , {backgroundColor: 0x3079f0});

gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

//code from Dr Palmer
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

//Creating sprites
//backgrounds
var start_screen_bg = new PIXI.Sprite(
  PIXI.Texture.fromImage("startScreen.png") );

//buttons to navigate menu
var start_screen_button = new PIXI.Sprite(
  PIXI.Texture.fromImage("startButton.png") );

//backgrounds for game level
var background = new PIXI.Sprite(
  PIXI.Texture.fromImage("background.png") );

//add start screen to scene graph
var start_screen = new PIXI.Container();
start_screen.position.x = 200;
start_screen.position.y = 200;
stage.addChild(start_screen);

//add start screen background to start screen
start_screen.addChild(start_screen_bg);
start_screen_bg.position.x = -200;
start_screen_bg.position.y = -200;

//start button to go to game1
start_screen_bg.addChild(start_screen_button);
start_screen_button.position.x = 30;
start_screen_button.position.y = 325;
