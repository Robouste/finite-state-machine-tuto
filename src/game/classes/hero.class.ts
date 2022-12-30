import { Direction, KeyboardKey, SpriteWithDynamicBody } from "../helpers/types";
import { GameScene } from "../scenes/game.scene";

export interface Keys {
	[key: string]: KeyboardKey;
}

export class Hero {
	public direction: Direction;
	public currentRoom: number = 0;
	public previousRoom: number | null = null;
	public roomChange: boolean = false;
	public canMove: boolean = true;
	public keys: Keys;

	constructor(public scene: GameScene, public sprite: SpriteWithDynamicBody) {
		this.direction = "down";

		this.scene.physics.world.enable(this.sprite);
		this.scene.add.existing(this.sprite);

		this.sprite.body.setCollideWorldBounds(true);
		this.sprite.body.setSize(16, 10).setOffset(9, 16);

		this.keys = scene.input.keyboard.addKeys("W,S,A,D,UP,LEFT,RIGHT,DOWN,SPACE") as Keys;
	}

	public checkForRoomChange(): void {
		let roomNumber: number = 0;

		for (let room in this.scene.rooms) {
			const roomLeft = this.scene.rooms[room].x;
			const roomRight = this.scene.rooms[room].x + this.scene.rooms[room].width;
			const roomTop = this.scene.rooms[room].y;
			const roomBottom = this.scene.rooms[room].y + this.scene.rooms[room].height;

			// Player is within the boundaries of the room
			if (this.sprite.x > roomLeft && this.sprite.x < roomRight && this.sprite.y > roomTop && this.sprite.y < roomBottom) {
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
