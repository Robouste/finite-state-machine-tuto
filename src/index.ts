import "phaser";
import { Gameconfig } from "./game/helpers/types";
import { GameScene } from "./game/scenes/game.scene";
import { PreloadScene } from "./game/scenes/preload.scene";

const config: Gameconfig = {
	width: 800,
	height: 600,
	parent: "thegame",
	scene: [PreloadScene, GameScene],
};

new Phaser.Game(config);
