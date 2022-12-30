import { Hero } from "../classes/hero.class";
import { Keys } from "../helpers/keys";
import { Tools } from "../helpers/tools";
import { GameScene } from "../scenes/game.scene";
import { State } from "./state";

export class MovingState extends State<Hero> {
	public enter(scene: GameScene, hero: Hero): void {}

	public update(scene: GameScene, hero: Hero): void {
		if (!hero.canMove) {
			this.stateMachine.transition(Keys.States.Idle);
			return;
		}

		const velocity = hero.onLadder ? 25 : 100;
		hero.onLadder = false;

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

		hero.sprite.setVelocity(0);

		if (up.isDown) {
			hero.sprite.setVelocityY(-velocity);
			hero.direction = "up";
		} else if (down.isDown) {
			hero.sprite.setVelocityY(velocity);
			hero.direction = "down";
		}

		if (left.isDown) {
			hero.sprite.setVelocityX(-velocity);
			hero.direction = "left";
		} else if (right.isDown) {
			hero.sprite.setVelocityX(velocity);
			hero.direction = "right";
		}

		hero.sprite.anims.play(Tools.walkMapping.get(hero.direction)!, true);
	}
}
