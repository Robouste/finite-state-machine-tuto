import { Keys } from "../helpers/keys";

export class PreloadScene extends Phaser.Scene {
	constructor() {
		super(Keys.Scenes.Preload);
	}

	public preload(): void {
		this.load.image(Keys.Images.Background, "assets/bg.png");
		this.load.image(Keys.Images.Overworld, "assets/maps/Overworld.png");
		this.load.image(Keys.Images.Objects, "assets/maps/objects.png");
		this.load.spritesheet(Keys.Sprites.Hero, "assets/hero.png", { frameWidth: 32, frameHeight: 32 });
		this.load.tilemapTiledJSON(Keys.Maps.Home, "assets/maps/home.json");
		this.load.tilemapTiledJSON(Keys.Maps.Start, "assets/maps/start.json");
	}

	public create(): void {
		this.scene.start(Keys.Scenes.Game);
	}
}
