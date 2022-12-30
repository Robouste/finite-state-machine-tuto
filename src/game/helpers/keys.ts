export namespace Keys {
	export enum Images {
		Background = "background",
		Overworld = "Overworld",
		Objects = "Objects",
		Castle = "Castle",
	}

	export enum Sprites {
		Hero = "hero",
		NPC = "npc",
	}

	export enum Animations {
		WalkDown = "walk-down",
		WalkRight = "walk-right",
		WalkUp = "walk-up",
		WalkLeft = "walk-left",
		SwingDown = "swing-down",
		SwingRight = "swing-right",
		SwingUp = "swing-up",
		SwingLeft = "swing-left",
	}

	export enum Audio {}

	export enum Scenes {
		Preload = "preload",
		Game = "game",
	}

	export enum TileLayers {
		Ground = "Ground",
		Obsticles = "Obsticles",
		Obsticles2 = "Obsticles2",
		Walkable = "Walkable",
	}

	export enum Maps {
		Home = "home",
		Start = "start",
		Start2 = "start-2",
	}

	export enum Atlases {}

	export enum KeydownEvents {
		Space = "keydown-SPACE",
		ArrowDown = "keydown-DOWN",
		ArrowUp = "keydown-UP",
		P = "keydown-P",
	}

	export enum KeyupEvents {
		ArrowDown = "keyup-DOWN",
	}

	export enum MouseEvents {
		PointerDown = "pointerdown",
	}

	export enum States {
		Idle = "idle",
		Moving = "moving",
		Swinging = "swinging",
		Dashing = "dashing",
		BeingHit = "beinghit",
	}
}
