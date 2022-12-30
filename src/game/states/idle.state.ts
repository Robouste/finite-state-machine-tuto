import { Hero } from "../classes/hero.class";
import { Keys } from "../helpers/keys";
import { Tools } from "../helpers/tools";
import { GameScene } from "../scenes/game.scene";
import { State } from "./state";

export class IdleState extends State<Hero> {
	constructor(private canMove: boolean = true) {
		super();
	}

	public enter(scene: GameScene, hero: Hero): void {
		hero.sprite.setVelocity(0);
		hero.sprite.anims.play(Tools.walkMapping.get(hero.direction)!);
		hero.sprite.anims.stop();
	}

	public update(scene: GameScene, hero: Hero): void {
		if (!this.canMove) {
			return;
		}

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
