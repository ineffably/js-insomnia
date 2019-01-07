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
  this.load.atlas('blocks', 'assets/platformer-a/abstract_tiles.png', 'assets/platformer-a/abstract_tiles.json');
  this.load.image('parts', 'assets/platformer-a/abstract_tiles.png');
}

function create() {
  const mapConfig = { data: [], tileWidth: 64, tileHeight: 64 };
  const atlasTexture = this.textures.get('blocks');
  const frames = atlasTexture.getFrameNames();
  const dim = {x: 20*64, y: 64 * (Math.floor(frames.length/20) + 1)};
  // const gridTexture = new RenderTexture(scene [, x] [, y] [, width] [, height])
  // const map = this.make.tilemap({tileWidth: 64, tileHeight: 64, width: 64, height: 64});

  const map = this.make.tilemap(mapConfig);

  
  console.log(dim);
  // const gridTexture = new Phaser.GameObjects.RenderTexture(this, 0, 0, dim.x, dim.y);
  const gridTexture = this.add.renderTexture(0, 0, dim.x, dim.y);
  // gridTexture.active = false;
  gridTexture.name = 'bricks';

  console.log(gridTexture);
  
  // const blockTiles = partLayer.addTilesetImage('blocks', 'blocks');
  // this.add.tileSprite(200, 300, 64, 64, 'blocks', 'blockGreen.png');
  // const blocks = parts.addTilesetImage('blocks');

  const o = { x: 0, y: 0 };
  for (let i = 0; i < frames.length; i++) {
    if (i > 0 && i % 20 === 0) {
      o.x = 0;
      o.y++;
    }
    const height = atlasTexture.frames[frames[i]].height;
    // console.log(atlasTexture.frames[frames[i]].height);
    const offset = 64 - height;
    gridTexture.drawFrame('blocks', frames[i], o.x * 64, (o.y * 64 + offset));
    o.x++;
  }
  this.textures.addImage('elements', gridTexture);
  const blocks = map.addTilesetImage();
  const mapLayer = map.createBlankDynamicLayer('tools', blocks, 0, 0, 640, 480, 64, 64);
  // mapLayer.putTileAt(0, 5, 5);
  console.log(mapLayer);
  console.log('textures', this.textures);

  // gridTexture.x = -10000;
  // gridTexture.y = -10000;
  // console.log(o);
  // console.log(Object.keys(tiles.image.frames));
  // console.log(tiles.image.frames['blockGreen.png']);
  // console.log(map, map);

  setState('map', map);
}

function tileFromPointer(map) {
  const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
  const marker = new Phaser.Math.Vector2();
  // Snap to tile coordinates, but in world space
  marker.x = map.tileToWorldX(map.worldToTileX(worldPoint.x));
  marker.y = map.tileToWorldY(map.worldToTileY(worldPoint.y));
  return {
    marker,
    worldPoint
  };
}

function update() {
  const userTile = tileFromPointer.apply(this, [state.map]);

  if (this.input.manager.activePointer.isDown) {
    const selectedTile = state.map.getTileAt(userTile.marker.x, userTile.marker.y);
    console.log(selectedTile);
  }
}

export default {
  start: () => {
    console.log('start first game');
    const game = new Phaser.Game(config);
    console.info(game);
  }
};
