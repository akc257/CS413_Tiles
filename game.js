var GAME_WIDTH = 720;
var GAME_HEIGHT = 400;
var GAME_SCALE = 2.25;
// var HORIZON_Y = GAME_HEIGHT/GAME_SCALE/2;

var gameport = document.getElementById("gameport");
var renderer = new PIXI.autoDetectRenderer(GAME_WIDTH,
                                           GAME_HEIGHT,
                                           {backgroundColor: 0x99D5FF});

gameport.appendChild(renderer.view);

var stage = new PIXI.Container();
// stage.scale.x = GAME_SCALE;
// stage.scale.y = GAME_SCALE;

// Scene objects get loaded in the ready function
var playerUp, playerDown, playerRight, playerLeft;
var world;
var bool;

//add start screen to scene graph
var start_screen = new PIXI.Container();
stage.addChild(start_screen);

var start_screen_bg = new PIXI.Sprite(
  PIXI.Texture.fromImage("title_screen.png") );

//button to navigate menus
var start_screen_button = new PIXI.Sprite(
  PIXI.Texture.fromImage("play_button.png") );

//start button to go to game
start_screen_bg.addChild(start_screen_button);
start_screen_button.position.x = 30;
start_screen_button.position.y = 325;

//add start screen background to start screen
start_screen.addChild(start_screen_bg);

//functon to switch screen when start button is clicked on
function mouseStartHandler(e)
{
  stage.removeChild(start_screen);
  stage.addChild(world);
  stage.scale.x = GAME_SCALE;
  stage.scale.y = GAME_SCALE;
  bool = true;
}

//call mousehandler when screen clicked on
start_screen_button.interactive = true;
start_screen_button.on('mousedown', mouseStartHandler);

function gameloop() {
        movePlayer();
}

// movePlayer function makes smoother movement
function movePlayer() {
      if(playerUp && player.position.y > 64) {
          player.position.y -= 2;
      }
      if(playerDown && player.position.y < 688) {
          player.position.y += 2;
      }
      if(playerLeft && player.position.x > 64) {
          player.position.x -= 2;
      }
      if(playerRight && player.position.x < 688) {
          player.position.x += 2;
      }
}


function keydownEventHandler(e) {

  if (e.keyCode == 87) { // W key
    playerUp = true;
  }

  if (e.keyCode == 83) { // S key
    playerDown = true;
  }

  if (e.keyCode == 65) { // A key
    playerLeft = true;
  }

  if (e.keyCode == 68) { // D key
    playerRight = true;
  }
}

function keyupEventHandler(e) {
  if (e.keyCode == 87) { // W key
    playerUp = false;
  }
  if (e.keyCode == 83) { // S key
    playerDown = false;
  }

  if (e.keyCode == 65) { // A key
    playerLeft = false;
  }

  if (e.keyCode == 68) { // D key
    playerRight = false;
  }
}

document.addEventListener('keydown', keydownEventHandler);
document.addEventListener('keyup', keyupEventHandler);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

PIXI.loader
  .add('map_json', 'map.json')
  .add('map', 'map.png')
  .add('assets.json')
  .load(ready);

function ready() {
  var tu = new TileUtilities(PIXI);
  world = tu.makeTiledWorld("map_json", "map.png");
  //stage.addChild(world);

  var frames = [];
  for( var i = 1; i <=3; i++)
  {
    frames.push(PIXI.Texture.fromFrame("astro" + i + ".png"));
  }

  player = new PIXI.extras.MovieClip(frames);
  player.animationSpeed = .1;

  player.scale.set(0.1, 0.1);
  player.position.x = 350;
  player.position.y = 200;

  player.play();

  var entity_layer = world.getObject("GameObjects");
  entity_layer.addChild(player);

  animate();
  update();
  bool = false;
}

function animate(timestamp) {
  requestAnimationFrame(animate);
  update_camera();
  renderer.render(stage);
}

function update(){
    setInterval(gameloop, 20);
}

function update_camera() {
  if( bool )
  {
    stage.x = -player.x*GAME_SCALE + GAME_WIDTH/2 - player.width/2*GAME_SCALE;
    stage.y = -player.y*GAME_SCALE + GAME_HEIGHT/2 + player.height/2*GAME_SCALE;
    stage.x = -Math.max(0, Math.min(world.worldWidth*GAME_SCALE - GAME_WIDTH, -stage.x));
    stage.y = -Math.max(0, Math.min(world.worldHeight*GAME_SCALE - GAME_HEIGHT, -stage.y));
  }
}
