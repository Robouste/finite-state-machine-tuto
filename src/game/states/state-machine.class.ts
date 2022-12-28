import { Keys } from "../helpers/keys";
import { GameScene } from "../scenes/game.scene";
import { State } from "./state";

export class StateMachine<T> {
	private state: State<T> | undefined;

	constructor(
		private initialState: Keys.States,
		private possibleStates: Map<Keys.States, State<T>>,
		private scene: GameScene,
		private object: T
	) {
		for (const state of Object.values(this.possibleStates)) {
			state.stateMachine = this;
		}

		this.possibleStates.forEach((state) => (state.stateMachine = this));
	}

	public step(): void {
		if (this.state == null) {
			this.state = this.possibleStates.get(this.initialState)!;
			this.state.enter(this.scene, this.object);
		}

		this.state.update(this.scene, this.object);
	}

	public transition(newState: Keys.States): void {
		this.state = this.possibleStates.get(newState)!;
		this.state.enter(this.scene, this.object);
	}
}
