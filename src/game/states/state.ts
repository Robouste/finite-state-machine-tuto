import { Hero } from "../classes/hero.class";
import { GameScene } from "../scenes/game.scene";
import { StateMachine } from "./state-machine.class";

export abstract class State {
	public stateMachine!: StateMachine;
	public abstract enter(scene: GameScene, hero: Hero): void;
	public abstract execute(scene: GameScene, hero: Hero): void;
}
