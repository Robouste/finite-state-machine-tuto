import { Keys } from "../helpers/keys";
import { Utils } from "../helpers/utils";
import { GameScene } from "../scenes/game.scene";
import { Hero } from "./hero.class";

export class StateMachine {
	private state: State | undefined;

	constructor(
		private initialState: Keys.States,
		private possibleStates: Map<Keys.States, State>,
		private scene: GameScene,
		private hero: Hero
	) {
		for (const state of Object.values(this.possibleStates)) {
			state.stateMachine = this;
		}

		this.possibleStates.forEach((state) => (state.stateMachine = this));
	}

	public step(): void {
		if (this.state == null) {
			this.state = this.possibleStates.get(this.initialState)!;
			this.state.enter(this.scene, this.hero);
		}

		this.state.execute(this.scene, this.hero);
	}

	public transition(newState: Keys.States): void {
		this.state = this.possibleStates.get(newState)!;
		this.state.enter(this.scene, this.hero);
	}
}

export abstract class State {
	public stateMachine!: StateMachine;
	public abstract enter(scene: GameScene, hero: Hero): void;
	public abstract execute(scene: GameScene, hero: Hero): void;
}

export class IdleState extends State {
	public enter(scene: GameScene, hero: Hero): void {
		hero.setVelocity(0);
		hero.anims.play(Utils.walkMapping.get(hero.direction)!);
		hero.anims.stop();
	}

	public execute(scene: GameScene, hero: Hero): void {
		const { left, right, up, down, space, shift } = scene.keys;

		// Transition to swing if pressing space
		if (space.isDown) {
			this.stateMachine.transition(Keys.States.Swinging);
			return;
		}

		// Transition to dash if pressing shift
		if (shift.isDown) {
			this.stateMachine.transition(Keys.States.Dashing);
			return;
		}

		// Transition to move if pressing a movement key
		if (left.isDown || right.isDown || up.isDown || down.isDown) {
			this.stateMachine.transition(Keys.States.Moving);
			return;
		}
	}
}

export class MovingState extends State {
	public enter(scene: GameScene, hero: Hero): void {}

	public execute(scene: GameScene, hero: Hero): void {
		const { left, right, up, down, space, shift } = scene.keys;

		// Transition to swing if pressing space
		if (space.isDown) {
			this.stateMachine.transition(Keys.States.Swinging);
			return;
		}

		// Transition to dash if pressing shift
		if (shift.isDown) {
			this.stateMachine.transition(Keys.States.Dashing);
			return;
		}

		// Transition to idle if not pressing movement keys
		if (!(left.isDown || right.isDown || up.isDown || down.isDown)) {
			this.stateMachine.transition(Keys.States.Idle);
			return;
		}

		hero.setVelocity(0);
		if (up.isDown) {
			hero.setVelocityY(-100);
			hero.direction = "up";
		} else if (down.isDown) {
			hero.setVelocityY(100);
			hero.direction = "down";
		}

		if (left.isDown) {
			hero.setVelocityX(-100);
			hero.direction = "left";
		} else if (right.isDown) {
			hero.setVelocityX(100);
			hero.direction = "right";
		}

		hero.anims.play(Utils.walkMapping.get(hero.direction)!);
	}
}

export class SwingingState extends State {
	public enter(scene: GameScene, hero: Hero): void {
		hero.setVelocity(0);
		hero.anims.play(Utils.swingMapping.get(hero.direction)!);
		hero.once("animationcomplete", () => {
			this.stateMachine.transition(Keys.States.Idle);
		});
	}

	public execute(scene: GameScene, hero: Hero): void {}
}

export class DashingState extends State {
	public enter(scene: GameScene, hero: Hero): void {
		hero.setVelocity(0);
		hero.play(Utils.swingMapping.get(hero.direction)!);
		switch (hero.direction) {
			case "up":
				hero.setVelocityY(-300);
				break;
			case "down":
				hero.setVelocityY(300);
				break;
			case "left":
				hero.setVelocityX(-300);
				break;
			case "right":
				hero.setVelocityX(300);
				break;
		}

		// Wait a third of a second then go back to idle
		scene.time.delayedCall(300, () => {
			this.stateMachine.transition(Keys.States.Idle);
		});
	}

	public execute(scene: GameScene, hero: Hero): void {}
}
