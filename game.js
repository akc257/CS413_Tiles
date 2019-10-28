var GAME_WIDTH = 700;
var GAME_HEIGHT = 400;
var GAME_SCALE = 1.5;
// var HORIZON_Y = GAME_HEIGHT/GAME_SCALE/2;

var gameport = document.getElementById("gameport");
var renderer = new PIXI.autoDetectRenderer(GAME_WIDTH,
                                           GAME_HEIGHT,
                                           {backgroundColor: 0x99D5FF});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();
stage.scale.x = GAME_SCALE;
stage.scale.y = GAME_SCALE;

// Scene objects get loaded in the ready function
var player;
var world;

// Character movement constants:
var MOVE_LEFT = 1;
var MOVE_RIGHT = 2;
var MOVE_UP = 3;
var MOVE_DOWN = 4;
var MOVE_NONE = 0;

// The move function starts or continues movement
function move() {
  if (player.direction == MOVE_NONE) {
    player.moving = false;
    console.log(player.y);
    return;
  }
  player.moving = true;
  console.log("move");

  if (player.direction == MOVE_LEFT) {
    createjs.Tween.get(player).to({x: player.x - 32}, 500).call(move);
  }
  if (player.direction == MOVE_RIGHT)
    createjs.Tween.get(player).to({x: player.x + 32}, 500).call(move);

  if (player.direction == MOVE_UP)
    createjs.Tween.get(player).to({y: player.y - 32}, 500).call(move);

  if (player.direction == MOVE_DOWN)
    createjs.Tween.get(player).to({y: player.y + 32}, 500).call(move);
}

function keydownEventHandler(e) {

  if (e.keyCode == 87) { // W key
    player.position.y -= 16;
  }

  if (e.keyCode == 83) { // S key
    player.position.y += 16;
  }

  if (e.keyCode == 65) { // A key
    player.position.x -= 16;
  }

  if (e.keyCode == 68) { // D key
    player.position.x += 16;
  }
}

document.addEventListener('keydown', keydownEventHandler);


PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

PIXI.loader
  .add('map_json', 'map.json')
  .add('map', 'map.png')
  .add('astro', 'Astro_up.png')
  .add('blob', 'blob.png')
  .load(ready);

function ready() {
  var tu = new TileUtilities(PIXI);
  world = tu.makeTiledWorld("map_json", "map.png");
  stage.addChild(world);

  player = new PIXI.Sprite(PIXI.Texture.fromImage("Astro_up.png"));
  player.scale.set(0.1, 0.1);
  player.position.x = 350;
  player.position.y = 200;
  player.anchor.set(0.5);

  // Find the entity layer
  var entity_layer = world.getObject("GameObjects");
  entity_layer.addChild(player);

  animate();
}

function animate(timestamp) {
  requestAnimationFrame(animate);
  update_camera();
  renderer.render(stage);
}

function update_camera() {
  stage.x = -player.x*GAME_SCALE + GAME_WIDTH/2 - player.width/2*GAME_SCALE;
  stage.y = -player.y*GAME_SCALE + GAME_HEIGHT/2 + player.height/2*GAME_SCALE;
  stage.x = -Math.max(0, Math.min(world.worldWidth*GAME_SCALE - GAME_WIDTH, -stage.x));
  stage.y = -Math.max(0, Math.min(world.worldHeight*GAME_SCALE - GAME_HEIGHT, -stage.y));
}
