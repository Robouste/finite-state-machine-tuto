import { GameScene } from "../scenes/game.scene";
import { StateMachine } from "./state-machine.class";

export abstract class State<T> {
	public stateMachine!: StateMachine<T>;

	public abstract enter(scene: GameScene, object: T): void;
	public abstract update(scene: GameScene, object: T): void;
}
