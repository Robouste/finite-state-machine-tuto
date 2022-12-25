import { Keys } from "../helpers/keys";

export class PreloadScene extends Phaser.Scene {
	constructor() {
		super(Keys.Scenes.Preload);
	}

	public preload(): void {
		this.load.image("logo", "assets/phaser3-logo.png");
	}

	public create(): void {
		this.scene.start(Keys.Scenes.Game);
	}
}
