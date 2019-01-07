import Phaser from 'phaser';
const config = {
  type: Phaser.Auto,
  width: 1280,
  height: 768,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const state = {};

function setState(key, value) {
  state[key] = value;
}

function preload() {
  this.load.atlasXML('all', 'assets/platformer-a/spritesheet_complete.png', 'assets/platformer-a/spritesheet_complete.xml');
  this.load.image('abstract-grid', 'assets/platformer-a/abstract-grid.png');
}

function create() {
  const mapConfig = { data: [], tileWidth: 64, tileHeight: 64, width: 640, height: 480 };
  const map = this.make.tilemap(mapConfig);
  const grid = map.addTilesetImage('abstract-grid');
  const layer1 = map.createBlankDynamicLayer('layer1', grid);
  map.putTileAt(1, 3, 3);
  layer1.fill(58, 0, 13, 25, 1);
  // const dim = {x: 20*64, y: 64 * (Math.floor(frames.length/20) + 1)};
  // const mapLayer = map.createBlankDynamicLayer('tools', blocks, 0, 0, 640, 480, 64, 64);
  console.log(map);
  setState('map', map);
  setState('layer1', layer1);
}

function tileFromPointer(map) {
  const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

  const marker = new Phaser.Math.Vector2();
  const pointerTile = new Phaser.Math.Vector2();

  pointerTile.x = map.worldToTileX(worldPoint.x);
  pointerTile.y = map.worldToTileY(worldPoint.y);
  
  marker.x = map.tileToWorldX(pointerTile.x);
  marker.y = map.tileToWorldY(pointerTile.y);

  return {
    pointerTile,
    marker,
    worldPoint
  };
}

function update() {
  const userTile = tileFromPointer.apply(this, [state.map]);

  if (this.input.manager.activePointer.isDown) {
    console.log(userTile.pointerTile);
    // const selectedTile = state.map.getTileAt(userTile.marker.x, userTile.marker.y);
    state.layer1.putTileAt(0, userTile.pointerTile.x, userTile.pointerTile.y);
    // console.log(selectedTile);
  }
}

export default {
  start: () => {
    console.log('start first game');
    const game = new Phaser.Game(config);
    console.info(game);
  }
};
