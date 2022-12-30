import { Direction, KeyboardKey, Texture } from "../helpers/types";
import { GameScene } from "../scenes/game.scene";

export interface Keys {
	[key: string]: KeyboardKey;
}

export class Hero extends Phaser.Physics.Arcade.Sprite {
	public direction: Direction = "down";
	public currentRoom: number = 0;
	public previousRoom: number | null = null;
	public roomChange: boolean = false;
	public canMove: boolean = true;
	public onLadder: boolean = false;

	constructor(public scene: GameScene, x: number, y: number, texture: string | Texture, frame?: number) {
		super(scene, x, y, texture, frame);

		scene.physics.world.enable(this);
		scene.add.existing(this);

		this.setCollideWorldBounds(true);
		this.setSize(16, 10).setOffset(9, 16);
	}

	protected preUpdate(time: number, delta: number): void {
		super.preUpdate(time, delta);
		this.checkForRoomChange();
	}

	public checkForRoomChange(): void {
		let roomNumber: number = 0;

		for (let room in this.scene.rooms) {
			const roomLeft = this.scene.rooms[room].x;
			const roomRight = this.scene.rooms[room].x + this.scene.rooms[room].width;
			const roomTop = this.scene.rooms[room].y;
			const roomBottom = this.scene.rooms[room].y + this.scene.rooms[room].height;

			// Player is within the boundaries of the room
			if (this.x > roomLeft && this.x < roomRight && this.y > roomTop && this.y < roomBottom) {
				roomNumber = +room;

				// Set this room as visited by the player
				let visited = this.scene.rooms[room].properties.find((prop) => prop.name === "visited");

				if (visited) {
					visited.value = true;
				} else {
					throw Error("Visited property does not exist");
				}
			}
		}

		if (roomNumber != this.currentRoom) {
			this.previousRoom = this.currentRoom;
			this.currentRoom = roomNumber;
			this.roomChange = true;
		} else {
			this.roomChange = false;
		}
	}
}
