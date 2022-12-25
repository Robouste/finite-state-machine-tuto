import { Keys } from "../helpers/keys";

export class PreloadScene extends Phaser.Scene {
	constructor() {
		super(Keys.Scenes.Preload);
	}

	public preload(): void {
		this.load.image(Keys.Images.Background, "assets/bg.png");
		this.load.spritesheet(Keys.Sprites.Hero, "assets/hero.png", { frameWidth: 32, frameHeight: 32 });
	}

	public create(): void {
		this.scene.start(Keys.Scenes.Game);
	}
}
