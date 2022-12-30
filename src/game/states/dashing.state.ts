import { Hero } from "../classes/hero.class";
import { Keys } from "../helpers/keys";
import { Tools } from "../helpers/tools";
import { GameScene } from "../scenes/game.scene";
import { State } from "./state";

export class DashingState extends State<Hero> {
	public enter(scene: GameScene, hero: Hero): void {
		hero.setVelocity(0);
		hero.play(Tools.swingMapping.get(hero.direction)!);
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

	public update(scene: GameScene, hero: Hero): void {}
}
