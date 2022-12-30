import * as AnimatedTiles from "../../assets/plugins/AnimatedTiles";
import { Hero } from "../classes/hero.class";
import { Keys } from "../helpers/keys";
import { Systems } from "../helpers/systems.class";
import { Tools } from "../helpers/tools";
import { ArcadeGroup, CursorKeys, ImageWithDynamicBody, SpriteWithDynamicBody, TilemapLayer } from "../helpers/types";
import { ObjectLayer } from "../interfaces/object-layer.interface";
import { AttackingState } from "../states/attacking.state";
import { BeingHitState } from "../states/being-hit.state";
import { DashingState } from "../states/dashing.state";
import { EnnemyIdleState } from "../states/ennemy-idle.state";
import { IdleState } from "../states/idle.state";
import { MovingState } from "../states/moving.state";
import { State } from "../states/state";
import { StateMachine } from "../states/state-machine.class";

export class GameScene extends Phaser.Scene {
	public keys!: CursorKeys;
	public swordHitBox!: ImageWithDynamicBody;
	public ennemy!: SpriteWithDynamicBody;
	public rooms: ObjectLayer[] = [];

	private hero!: Hero;
	private heroStateMachine!: StateMachine<Hero>;
	private ennemyStateMachine!: StateMachine<SpriteWithDynamicBody>;
	private impassableLayer!: TilemapLayer;
	private ladders!: ArcadeGroup;

	private get systems(): Systems {
		return this.sys as Systems;
	}

	constructor() {
		super(Keys.Scenes.Game);
	}

	public init(): void {
		this.keys = this.input.keyboard.createCursorKeys();
	}

	public preload(): void {
		this.load.scenePlugin("animatedTiles", AnimatedTiles, "animatedTiles", "animatedTile");
	}

	public create(): void {
		this.createMapsAndLayers(Keys.Maps.Start);

		this.ennemy = this.physics.add.sprite(Tools.getTilePosition(22), Tools.getTilePosition(7), Keys.Sprites.NPC, 0);
		this.add.text(this.ennemy.x - 14, this.ennemy.y - 16, "Max", {
			fontSize: "16px",
			color: "#000",
			stroke: "#fff",
			strokeThickness: 1,
		});

		this.createSwordAttack();

		this.createStateMachines();

		this.physics.add.overlap(
			this.swordHitBox,
			this.ennemy,
			() => this.ennemyStateMachine.transition(Keys.States.BeingHit),
			undefined,
			this
		);

		this.physics.add.collider(this.hero, this.impassableLayer);
		this.physics.add.overlap(this.hero, this.ladders, () => (this.hero.onLadder = true), undefined, this);
		this.impassableLayer.setCollisionByExclusion([-1], true);

		this.createAnims();
	}

	public update(time: number, delta: number): void {
		this.heroStateMachine.step();

		if (this.hero.roomChange) {
			this.cameras.main.fadeOut(250, 0, 0, 0, (camera, progress) => {
				this.hero.canMove = false;

				if (progress === 1) {
					const currentRoom = this.rooms[this.hero.currentRoom];
					this.cameras.main
						.setBounds(currentRoom.x, currentRoom.y, currentRoom.width, currentRoom.height, true)
						.fadeIn(500, 0, 0, 0, (camera, progress) => {
							if (progress === 1) {
								this.hero.canMove = true;
							}
						});
				}
			});
		}
	}

	private createMapsAndLayers(key: Keys.Maps): void {
		const map = this.make.tilemap({ key });
		const overworldTileset = map.addTilesetImage(Keys.Images.Overworld);
		const objectsTileset = map.addTilesetImage(Keys.Images.Objects);
		const castleTileset = map.addTilesetImage(Keys.Images.Castle);
		const npcTileset = map.addTilesetImage(Keys.Sprites.NPC);

		const tilesets = [overworldTileset, objectsTileset, castleTileset, npcTileset];

		map.createLayer(Keys.TileLayers.Ground, tilesets, 0, 0);
		map.createLayer(Keys.TileLayers.NPC, tilesets);
		this.impassableLayer = map.createLayer(Keys.TileLayers.Obsticles, tilesets);
		const walkableLayer = map.createLayer(Keys.TileLayers.Walkable, tilesets);

		this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

		this.ladders = this.physics.add.group();

		map.findObject("Objects", (stupid) => {
			const object = stupid as unknown as ObjectLayer;

			object.properties.forEach((prop) => {
				switch (prop.value) {
					case "Room":
						this.rooms.push(object);
						object.properties.push({
							name: "visited",
							value: false,
							type: "bool",
						});
						break;
					case "Ladder":
						this.ladders.add(
							new Phaser.GameObjects.Rectangle(this, object.x, object.y, object.width, object.height).setOrigin(0)
						);
						break;
					case "Interaction":
						break;
				}
			});
		});

		const playerObject = map.getObjectLayer("Objects").objects.find((obj) => obj.name === "Player");

		if (playerObject) {
			this.createHero(playerObject.x!, playerObject.y!);
		}

		const currentRoom = this.rooms[this.hero.currentRoom];

		this.cameras.main
			.setZoom(1.2)
			.setBounds(currentRoom.x, currentRoom.y, currentRoom.width, currentRoom.height, true)
			.startFollow(this.hero)
			.fadeIn(2000, 0, 0, 0);

		this.systems.animatedTiles?.init(map);
	}

	private createHero(x: number, y: number): void {
		this.hero = new Hero(this, x, y, Keys.Sprites.Hero, 0);
	}

	private createSwordAttack(): void {
		this.swordHitBox = this.add.rectangle(0, 0, 10, 10, 0xffffff, 0) as unknown as ImageWithDynamicBody;
		this.physics.add.existing(this.swordHitBox);
		this.swordHitBox.body.enable = false;
		this.physics.world.remove(this.swordHitBox.body);
	}

	private createStateMachines(): void {
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
				.set(Keys.States.Idle, new EnnemyIdleState())
				.set(Keys.States.BeingHit, new BeingHitState()),
			this,
			this.ennemy
		);
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
