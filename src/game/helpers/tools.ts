import { Keys } from "./keys";
import { Direction } from "./types";

export class Tools {
	public static get swingMapping(): Map<Direction, Keys.Animations> {
		return new Map<Direction, Keys.Animations>()
			.set("down", Keys.Animations.SwingDown)
			.set("up", Keys.Animations.SwingUp)
			.set("right", Keys.Animations.SwingRight)
			.set("left", Keys.Animations.SwingLeft);
	}

	public static get walkMapping(): Map<Direction, Keys.Animations> {
		return new Map<Direction, Keys.Animations>()
			.set("down", Keys.Animations.WalkDown)
			.set("up", Keys.Animations.WalkUp)
			.set("right", Keys.Animations.WalkRight)
			.set("left", Keys.Animations.WalkLeft);
	}

	public static getTilePosition(tileNumber: number): number {
		return tileNumber * 16;
	}
}
