import { Hero } from "../classes/hero.class";
import { Keys } from "../helpers/keys";
import { Tools } from "../helpers/tools";
import { GameScene } from "../scenes/game.scene";
import { State } from "./state";

export class AttackingState extends State {
	public enter(scene: GameScene, hero: Hero): void {
		hero.setVelocity(0);
		hero.anims.play(Tools.swingMapping.get(hero.direction)!);
		hero.once("animationcomplete", () => {
			this.stateMachine.transition(Keys.States.Idle);
		});
	}

	public execute(scene: GameScene, hero: Hero): void {}
}
