import { Hero } from "../classes/hero.class";
import { Keys } from "../helpers/keys";
import { GameScene } from "../scenes/game.scene";
import { State } from "./state";

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
