import { Hero } from "../classes/hero.class";
import { Keys } from "../helpers/keys";
import { Tools } from "../helpers/tools";
import { GameScene } from "../scenes/game.scene";
import { State } from "./state";

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

		hero.anims.play(Tools.walkMapping.get(hero.direction)!, true);
	}
}
