export namespace Keys {
	export enum Images {
		Background = "background",
	}

	export enum Sprites {
		Hero = "hero",
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

	export enum Tiles {}

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
	}
}
