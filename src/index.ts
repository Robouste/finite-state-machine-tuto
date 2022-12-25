import "phaser";
import { Gameconfig } from "./game/helpers/types";
import { GameScene } from "./game/scenes/game.scene";
import { PreloadScene } from "./game/scenes/preload.scene";

const config: Gameconfig = {
	width: 400,
	height: 300,
	parent: "thegame",
	pixelArt: true,
	zoom: 2,
	physics: {
		default: "arcade",
	},
	scene: [PreloadScene, GameScene],
};

new Phaser.Game(config);
