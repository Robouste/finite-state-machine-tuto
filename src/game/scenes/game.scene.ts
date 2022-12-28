import { Hero } from "../classes/hero.class";
import { Keys } from "../helpers/keys";
import { Tools } from "../helpers/tools";
import { CursorKeys, ImageWithDynamicBody, SpriteWithDynamicBody } from "../helpers/types";
import { AttackingState } from "../states/attacking.state";
import { BeingHitState } from "../states/being-hit.state";
import { DashingState } from "../states/dashing.state";
import { IdleState } from "../states/idle.state";
import { MovingState } from "../states/moving.state";
import { State } from "../states/state";
import { StateMachine } from "../states/state-machine.class";

export class GameScene extends Phaser.Scene {
	public keys!: CursorKeys;
	public swordHitBox!: ImageWithDynamicBody;
	public ennemy!: SpriteWithDynamicBody;
	private hero!: Hero;
	private heroStateMachine!: StateMachine<Hero>;
	private ennemyStateMachine!: StateMachine<SpriteWithDynamicBody>;

	constructor() {
		super(Keys.Scenes.Game);
	}

	public init(): void {
		this.keys = this.input.keyboard.createCursorKeys();
	}

	public create(): void {
		const map = this.make.tilemap({ key: Keys.Maps.Start });
		const overworldTileset = map.addTilesetImage(Keys.Images.Overworld);
		const objectsTileset = map.addTilesetImage(Keys.Images.Objects);

		const groundLayer = map.createLayer(Keys.TileLayers.Ground, [overworldTileset, objectsTileset], 0, 0);
		const impassableLayer = map.createLayer(Keys.TileLayers.Impassables, [overworldTileset, objectsTileset]);
		const walkableLayer = map.createLayer(Keys.TileLayers.Walkable, [overworldTileset, objectsTileset]);

		this.hero = this.physics.add.sprite(Tools.getTilePosition(20), Tools.getTilePosition(7), Keys.Sprites.Hero, 0) as Hero;
		this.hero.setCollideWorldBounds(true);
		this.hero.setSize(16, 10).setOffset(9, 16);
		this.hero.direction = "down";

		this.ennemy = this.physics.add.sprite(Tools.getTilePosition(22), Tools.getTilePosition(7), Keys.Sprites.NPC, 0);

		this.physics.add.collider(this.hero, impassableLayer);
		impassableLayer.setCollisionByExclusion([-1], true);

		this.swordHitBox = this.add.rectangle(0, 0, 10, 10, 0xffffff, 0) as unknown as ImageWithDynamicBody;
		this.physics.add.existing(this.swordHitBox);
		this.swordHitBox.body.enable = false;
		this.physics.world.remove(this.swordHitBox.body);

		this.heroStateMachine = new StateMachine(
			Keys.States.Idle,
			new Map<Keys.States, State<Hero>>()
				.set(Keys.States.Idle, new IdleState())
				.set(Keys.States.Moving, new MovingState())
				.set(Keys.States.Swinging, new AttackingState())
				.set(Keys.States.Dashing, new DashingState()),
			this,
			this.hero
		);

		this.ennemyStateMachine = new StateMachine(
			Keys.States.Idle,
			new Map<Keys.States, State<SpriteWithDynamicBody>>()
				.set(Keys.States.Idle, new IdleState(false))
				.set(Keys.States.BeingHit, new BeingHitState()),
			this,
			this.ennemy
		);

		this.physics.add.overlap(
			this.swordHitBox,
			this.ennemy,
			() => this.ennemyStateMachine.transition(Keys.States.BeingHit),
			undefined,
			this
		);

		this.createAnims();
	}

	public update(): void {
		this.heroStateMachine.step();
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
