var GAME_WIDTH = 720;
var GAME_HEIGHT = 400;
var GAME_SCALE = 4;
var DIM = 16;

var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, {backgroundColor: 0x3079f0});

gameport.appendChild(renderer.view);

var stage = new PIXI.Container();
stage.scale.x = GAME_SCALE;
stage.scale.y = GAME_SCALE;

// Scene objects get loaded in the ready function
var hero;
var world;
var water;

// Character movement constants:
var MOVE_LEFT = 1;
var MOVE_RIGHT = 2;
var MOVE_UP = 3;
var MOVE_DOWN = 4;
var MOVE_NONE = 0;

// The move function starts or continues movement
function move() {

  if (hero.direction == MOVE_NONE) {
    hero.moving = false;
    return;
  }

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
