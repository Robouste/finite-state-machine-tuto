import { Hero } from "../classes/hero.class";
import { DashingState, IdleState, MovingState, State, StateMachine, SwingingState } from "../classes/state-machine.class";
import { Keys } from "../helpers/keys";
import { CursorKeys } from "../helpers/types";

export class GameScene extends Phaser.Scene {
	public keys!: CursorKeys;
	private hero!: Hero;
	private stateMachine!: StateMachine;

	constructor() {
		super(Keys.Scenes.Game);
	}

	public init(): void {
		this.keys = this.input.keyboard.createCursorKeys();
	}

	public create(): void {
		this.add.image(200, 200, Keys.Images.Background);

		this.hero = this.physics.add.sprite(200, 150, Keys.Sprites.Hero, 0) as Hero;
		this.hero.direction = "down";

		this.stateMachine = new StateMachine(
			Keys.States.Idle,
			new Map<Keys.States, State>()
				.set(Keys.States.Idle, new IdleState())
				.set(Keys.States.Moving, new MovingState())
				.set(Keys.States.Swinging, new SwingingState())
				.set(Keys.States.Dashing, new DashingState()),
			this,
			this.hero
		);
	}

	public update(): void {
		this.createInputs();
		this.createAnims();
	}

	private createInputs(): void {
		// let moving = false;

		// this.hero.setVelocity(0);

		// // If we're swinging a sword, wait for the animation to finish
		// if (!this.hero.swinging) {
		// 	// Swinging a sword overrides movement
		// 	if (this.keys.space.isDown) {
		// 		this.hero.swinging = true;
		// 		this.hero.anims.play(this.swingMapping.get(this.hero.direction)!, true);

		// 		this.hero.once("animationcomplete", () => {
		// 			this.hero.anims.play(this.walkMapping.get(this.hero.direction)!, true);
		// 			this.hero.swinging = false;
		// 		});
		// 	} else {
		// 		// Set new velocity based on input
		// 		if (this.keys.up.isDown) {
		// 			this.hero.setVelocityY(-100);
		// 			this.hero.direction = "up";
		// 			moving = true;
		// 		} else if (this.keys.down.isDown) {
		// 			this.hero.setVelocityY(100);
		// 			this.hero.direction = "down";
		// 			moving = true;
		// 		}
		// 		if (this.keys.left.isDown) {
		// 			this.hero.setVelocityX(-100);
		// 			this.hero.direction = "left";
		// 			moving = true;
		// 		} else if (this.keys.right.isDown) {
		// 			this.hero.setVelocityX(100);
		// 			this.hero.direction = "right";
		// 			moving = true;
		// 		}

		// 		if (!moving) {
		// 			this.hero.anims.stop();
		// 		} else {
		// 			this.hero.anims.play(this.walkMapping.get(this.hero.direction)!, true);
		// 		}
		// 	}
		// }

		this.stateMachine.step();
	}

	private createAnims(): void {
		this.anims.create({
			key: Keys.Animations.WalkDown,
			frameRate: 8,
			repeat: -1,
			frames: this.anims.generateFrameNumbers(Keys.Sprites.Hero, { start: 0, end: 3 }),
		});

		this.anims.create({
			key: Keys.Animations.WalkRight,
			frameRate: 8,
			repeat: -1,
			frames: this.anims.generateFrameNumbers(Keys.Sprites.Hero, { start: 4, end: 7 }),
		});

		this.anims.create({
			key: Keys.Animations.WalkUp,
			frameRate: 8,
			repeat: -1,
			frames: this.anims.generateFrameNumbers(Keys.Sprites.Hero, { start: 8, end: 11 }),
		});

		this.anims.create({
			key: Keys.Animations.WalkLeft,
			frameRate: 8,
			repeat: -1,
			frames: this.anims.generateFrameNumbers(Keys.Sprites.Hero, { start: 12, end: 15 }),
		});

		this.anims.create({
			key: Keys.Animations.SwingDown,
			frameRate: 8,
			repeat: 0,
			frames: this.anims.generateFrameNumbers(Keys.Sprites.Hero, { start: 16, end: 19 }),
		});

		this.anims.create({
			key: Keys.Animations.SwingUp,
			frameRate: 8,
			repeat: 0,
			frames: this.anims.generateFrameNumbers(Keys.Sprites.Hero, { start: 20, end: 23 }),
		});

		this.anims.create({
			key: Keys.Animations.SwingRight,
			frameRate: 8,
			repeat: 0,
			frames: this.anims.generateFrameNumbers(Keys.Sprites.Hero, { start: 24, end: 27 }),
		});

		this.anims.create({
			key: Keys.Animations.SwingLeft,
			frameRate: 8,
			repeat: 0,
			frames: this.anims.generateFrameNumbers(Keys.Sprites.Hero, { start: 28, end: 31 }),
		});
	}
}
